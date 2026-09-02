import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
	'/',
	'/jak-dzialamy/',
	'/dla-ciebie/',
	'/dla-instytucji/',
	'/dla-pracodawcow/',
	'/historie-zmiany/',
	'/o-fundacji/',
	'/projekty/',
	'/projekty/inspiratorium-zawodowe/',
	'/wiedza/',
	'/wiedza/pytania-i-odpowiedzi/',
	'/wiedza/publikacje/wtz-w-dobrych-rekach/',
	'/kontakt/',
	'/wspieram/',
	'/szukaj/',
	'/mapa-strony/',
	'/deklaracja-dostepnosci/',
	'/polityka-prywatnosci/',
	'/statut-fundacji/',
	'/o-fundacji/sprawozdania/',
];

async function assertPageContract(page: Page, route: string) {
	const response = await page.goto(route, { waitUntil: 'load' });
	expect(response, `Expected ${page.url()} to return a response`).not.toBeNull();
	expect(response?.status(), `Expected ${page.url()} to load successfully`).toBeGreaterThanOrEqual(200);
	expect(response?.status(), `Expected ${page.url()} to load successfully`).toBeLessThan(300);
	expect(await page.locator('h1').count(), `Expected exactly one H1 on ${page.url()}`).toBe(1);
	expect((await page.title()).trim(), `Expected a nonempty title on ${page.url()}`).not.toBe('');
	expect((await page.locator('meta[name="description"]').getAttribute('content') ?? '').trim(), `Expected a nonempty description on ${page.url()}`).not.toBe('');
	expect(await page.locator('html').getAttribute('lang')).toBe('pl');

	const skipLink = page.locator('a.skip-link');
	await expect(skipLink).toHaveAttribute('href', '#main-content');
	const main = page.locator('#main-content');
	await expect(main).toHaveCount(1);
	await main.focus();
	expect(await page.evaluate(() => document.activeElement?.id)).toBe('main-content');
}

test.describe('public page accessibility and document contract', () => {
	test('every representative route loads with the shared document contract and no serious axe violations', async ({ page }) => {
		for (const route of routes) {
			await assertPageContract(page, route);
			const results = await new AxeBuilder({ page }).analyze();
			const seriousOrCritical = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
			expect(seriousOrCritical, `${route} has serious or critical accessibility violations: ${JSON.stringify(seriousOrCritical)}`).toEqual([]);
		}
	});

	test('all discovered same-origin HTML links return successful responses', async ({ page, request, baseURL }) => {
		const discovered = new Set<string>();
		for (const route of routes) {
			await page.goto(route, { waitUntil: 'load' });
			const hrefs = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((anchor) => (anchor as HTMLAnchorElement).href));
			for (const href of hrefs) {
				const url = new URL(href, page.url());
				if (url.origin !== new URL(baseURL ?? page.url()).origin || url.protocol !== 'http:' && url.protocol !== 'https:') continue;
				url.hash = '';
				if (url.pathname.startsWith('/api/') || /\.(?:pdf|docx?|xlsx?|zip|png|jpe?g|webp|svg|ico|mp4|mp3)$/i.test(url.pathname)) continue;
				if (!url.pathname.endsWith('/')) url.pathname += '/';
				discovered.add(url.href);
			}
		}

		for (const url of discovered) {
			const response = await request.get(url, { failOnStatusCode: false });
			expect(response.status(), `Internal link ${url} did not return a 2xx response`).toBeGreaterThanOrEqual(200);
			expect(response.status(), `Internal link ${url} did not return a 2xx response`).toBeLessThan(300);
		}
	});
});

test.describe('responsive layouts', () => {
	test.use({ viewport: { width: 320, height: 900 } });

	for (const route of ['/', '/kontakt/']) {
		test(`${route} does not overflow a 320px viewport`, async ({ page }) => {
			await page.goto(route, { waitUntil: 'load' });
			const width = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
			expect(width.document - width.viewport, `${route} overflows its viewport`).toBeLessThanOrEqual(1);
		});
	}
});

test('contact form has visible labels and Polish required-field feedback', async ({ page }) => {
	await page.goto('/kontakt/', { waitUntil: 'load' });
	const form = page.locator('#contact-form');
	const controls = form.locator('input:not([name="website"]), textarea, select');
	const controlIds = await controls.evaluateAll((elements) => elements.map((element) => element.id));
	expect(controlIds.length).toBeGreaterThan(0);
	for (const id of controlIds) {
		expect(id, 'Every non-honeypot form control needs an id').not.toBe('');
		const label = form.locator(`label[for="${id}"]`);
		await expect(label, `Missing label for #${id}`).toHaveCount(1);
		await expect(label, `Label for #${id} should be visible`).toBeVisible();
	}
	for (const id of ['name', 'email', 'subject', 'message', 'consent']) {
		await expect(form.locator(`label[for="${id}"]`)).toContainText(/wymagane/i);
	}

	await form.locator('button[type="submit"]').click();
	const summary = page.locator('#form-errors');
	await expect(summary).toBeVisible();
	await expect(summary).toContainText('Popraw następujące pola:');
	await expect(summary).toContainText(/Imię i nazwisko/);
	await expect(summary).toContainText(/Adres e-mail/);
	await expect(summary).toContainText(/Temat wiadomości/);
	await expect(summary).toContainText(/Treść wiadomości/);
	await expect(summary).toContainText(/Zgoda/);
	for (const id of ['name', 'email', 'subject', 'message', 'consent']) {
		await expect(form.locator(`#${id}`)).toHaveAttribute('aria-invalid', 'true');
		await expect(form.locator(`#${id}-error`)).not.toBeEmpty();
	}
});

test('search announces and renders results for tożsamość', async ({ page }) => {
	await page.goto('/szukaj/?q=to%C5%BCsamo%C5%9B%C4%87', { waitUntil: 'load' });
	await expect(page.locator('#search-results li').first()).toBeVisible();
	await expect(page.locator('#search-status')).toHaveAttribute('aria-live', 'polite');
	await expect(page.locator('#search-status')).toContainText(/Znaleziono [1-9][0-9]* wynik/);
});
