import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { contact, impact2024, impactSince2008, news, projects, team } from './data/content'
import type { ProjectStatus } from './data/content'
import './App.css'

type Route = { path: string; kind: string; slug?: string }

const parseRoute = (): Route => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const project = path.match(/^\/projekty\/([^/]+)$/)
  const article = path.match(/^\/aktualnosci\/([^/]+)$/)
  if (project) return { path, kind: 'project', slug: project[1] }
  if (article) return { path, kind: 'article', slug: article[1] }
  const known: Record<string, string> = {
    '/': 'home', '/projekty': 'projects', '/o-nas': 'about', '/aktualnosci': 'news', '/kontakt': 'contact', '/przekaz-darowizne': 'donate', '/dolacz-do-nas': 'join',
  }
  return { path, kind: known[path] || '404' }
}

function App() {
  const [route, setRoute] = useState<Route>(parseRoute)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onPop = () => {
      setMenuOpen(false)
      setRoute(parseRoute())
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.title = `${route.kind === 'home' ? 'Fundacja Aktywności Zawodowej' : route.kind === '404' ? 'Nie znaleziono strony' : ({ projects: 'Projekty', project: 'Projekt', about: 'O nas', news: 'Aktualności', article: 'Aktualność', contact: 'Kontakt', donate: 'Przekaż darowiznę', join: 'Dołącz do nas' }[route.kind] || 'FAZ')} | FAZ`
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const focusTimeout = window.setTimeout(() => document.querySelector<HTMLElement>('#main')?.focus(), 0)
    return () => window.clearTimeout(focusTimeout)
  }, [route])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href')
    if (!href || !href.startsWith('/') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', href)
    setMenuOpen(false)
    setRoute(parseRoute())
  }

  return <div className="site-shell">
    <a className="skip-link" href="#main">Przejdź do treści</a>
    <div className="topbar">Potrzebujesz wsparcia? <a href="tel:736858551">Zadzwoń 736 858 551</a> lub <a href={`mailto:${contact.email}`}>napisz</a></div>
    <header className="site-header">
      <a className="logo" href="/" onClick={navigate} aria-label="FAZ — strona główna"><img className="logo-image" src="/FAZ_logo_digital.svg" alt="Fundacja Aktywności Zawodowej" /></a>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><span>Menu</span><b>☰</b></button>
      <nav id="main-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Główna nawigacja">
        {[['/projekty/', 'Projekty'], ['/o-nas/', 'O nas'], ['/aktualnosci/', 'Aktualności'], ['/kontakt/', 'Kontakt']].map(([href, label]) => <a key={href} href={href} onClick={navigate} aria-current={route.path.startsWith(href.slice(0, -1)) ? 'page' : undefined}>{label}</a>)}
        <a className="nav-action" href="/przekaz-darowizne/" onClick={navigate}>Wesprzyj nas <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
    <main id="main" tabIndex={-1}>{renderView(route, navigate)}</main>
    <Footer navigate={navigate} />
  </div>
}

function ButtonLink({ href, children, className = '', onClick }: { href: string; children: React.ReactNode; className?: string; onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return <a className={`button ${className}`} href={href} onClick={onClick}>{children}</a>
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-intro"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="lead">{text}</p>}</div>
}

function renderView(route: Route, navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void) {
  if (route.kind === 'home') return <Home navigate={navigate} />
  if (route.kind === 'projects') return <Projects navigate={navigate} />
  if (route.kind === 'project') return <ProjectDetail slug={route.slug || ''} navigate={navigate} />
  if (route.kind === 'about') return <About navigate={navigate} />
  if (route.kind === 'news') return <News navigate={navigate} />
  if (route.kind === 'article') return <Article slug={route.slug || ''} navigate={navigate} />
  if (route.kind === 'contact') return <Contact />
  if (route.kind === 'donate') return <Donate navigate={navigate} />
  if (route.kind === 'join') return <Join />
  return <NotFound navigate={navigate} />
}

function Home({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return <>
    <section className="hero section-wrap"><div className="hero-copy"><p className="eyebrow">Fundacja Aktywności Zawodowej</p><h1>Praca daje sprawczość.<br /><em>Pomagamy znaleźć</em> własną drogę.</h1><p className="lead">Wspieramy osoby z niepełnosprawnościami w rozwoju zawodowym, rehabilitacji i pełniejszym uczestnictwie społecznym.</p><div className="hero-actions"><ButtonLink href="/projekty/" onClick={navigate}>Znajdź wsparcie <span aria-hidden="true">↗</span></ButtonLink><ButtonLink href="/o-nas/" className="button-quiet" onClick={navigate}>Poznaj FAZ</ButtonLink></div></div><HeroArt /></section>
    <section className="pathways section-wrap"><SectionIntro eyebrow="Jesteś tutaj" title="Wybierz swoją ścieżkę" /><div className="pathway-grid"><Pathway number="01" title="Szukam wsparcia" text="Znajdź projekt dopasowany do Twojej sytuacji." href="/projekty/" navigate={navigate} /><Pathway number="02" title="Chcę współpracować" text="Poznaj możliwości dla pracodawców i organizacji." href="/kontakt/" navigate={navigate} /><Pathway number="03" title="Chcę pomóc" text="Wesprzyj nasze działania lub dołącz jako wolontariusz." href="/dolacz-do-nas/" navigate={navigate} /></div></section>
    <Impact />
    <section className="section-wrap"><SectionIntro eyebrow="Działamy teraz" title="Projekty, które otwierają drzwi" text="Sprawdź, jak możemy Cię wesprzeć." /><div className="project-grid">{projects.filter(p => p.status === 'active').slice(0, 3).map(project => <ProjectCard key={project.slug} project={project} navigate={navigate} />)}</div><ButtonLink href="/projekty/" className="text-link" onClick={navigate}>Zobacz wszystkie projekty <span aria-hidden="true">→</span></ButtonLink></section>
    <HowWeWork /><Story navigate={navigate} /><LatestNews navigate={navigate} /><ContactCta navigate={navigate} />
  </>
}

function HeroArt() { return <div className="hero-art" aria-hidden="true"><div className="art-ring"></div><div className="art-card art-card-main"><span>Twoja droga</span><strong>zaczyna się<br />od rozmowy.</strong><i>✦</i></div><div className="art-note">01<br /><b>sprawczość</b></div><div className="art-sun"></div><div className="art-line"></div></div> }
function Pathway({ number, title, text, href, navigate }: { number: string; title: string; text: string; href: string; navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <ButtonLink href={href} onClick={navigate} className="pathway"><span className="path-number">{number}</span><strong>{title}</strong><span>{text}</span><b aria-hidden="true">↗</b></ButtonLink> }
function Impact() { return <section className="impact"><div className="section-wrap impact-inner"><div><p className="eyebrow">Nasze efekty</p><h2>Razem robimy<br /><em>miejsce</em> na możliwości.</h2><p>Każda liczba to konkretna osoba, jej decyzja i kolejny krok.</p></div><div className="stats">{impact2024.map(item => <div className="stat" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div><p className="impact-year">2024</p></div></section> }
function ProjectCard({ project, navigate }: { project: typeof projects[number]; navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <article className="project-card"><div className="project-top"><span className="status">{project.status === 'active' ? 'Projekt aktywny' : 'Zakończony'}</span><span aria-hidden="true">↗</span></div><h3>{project.title}</h3><p>{project.lead}</p><a href={`/projekty/${project.slug}/`} onClick={navigate}>Dowiedz się więcej <span aria-hidden="true">→</span></a></article> }
function HowWeWork() { return <section className="how section-wrap"><SectionIntro eyebrow="Bez zbędnych barier" title="Jak działamy" text="Dobre wsparcie zaczyna się od uważnego słuchania." /><div className="steps">{[['01', 'Poznajemy się', 'Rozmawiamy o Twojej sytuacji, potrzebach i planach.'], ['02', 'Szukamy możliwości', 'Wspólnie wybieramy projekt i rozwiązania dla Ciebie.'], ['03', 'Działamy razem', 'Towarzyszymy Ci w kolejnych krokach.'], ['04', 'Świętujemy drogę', 'Doceniamy każdy postęp — mały i duży.']].map(([no, title, text]) => <div className="step" key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section> }
function Story({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <section className="story section-wrap"><div className="story-visual" aria-hidden="true"><span>✦</span><strong>moja<br />droga</strong></div><div><p className="eyebrow">Historie wsparcia</p><h2>Dobrze dobrane wsparcie pomaga odzyskać <em>pewność siebie</em> i zrobić kolejny krok.</h2><p className="lead">Doświadczenia uczestników pokazują, że odpowiednio dobrane wsparcie może pomóc w drodze do pracy i pełniejszego uczestnictwa społecznego.</p><ButtonLink href="/projekty/" className="text-link" onClick={navigate}>Znajdź swoją drogę <span aria-hidden="true">→</span></ButtonLink></div></section> }
function LatestNews({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <section className="section-wrap news-home"><SectionIntro eyebrow="Z życia FAZ" title="Najnowsze aktualności" /><div className="news-grid">{news.slice(0, 3).map(item => <NewsCard key={item.slug} item={item} navigate={navigate} />)}</div><ButtonLink href="/aktualnosci/" className="text-link" onClick={navigate}>Wszystkie aktualności <span aria-hidden="true">→</span></ButtonLink></section> }
function NewsCard({ item, navigate }: { item: typeof news[number]; navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <article className="news-card"><p>{item.date}</p><h3>{item.title}</h3><a href={`/aktualnosci/${item.slug}/`} onClick={navigate}>Czytaj więcej <span aria-hidden="true">→</span></a></article> }
function ContactCta({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <section className="contact-cta section-wrap"><div><p className="eyebrow">Porozmawiajmy</p><h2>Nie wiesz, od czego zacząć?</h2><p>Napisz lub zadzwoń. Pomożemy znaleźć odpowiednią drogę.</p></div><ButtonLink href="/kontakt/" onClick={navigate}>Skontaktuj się <span aria-hidden="true">↗</span></ButtonLink></section> }
function PartnerCta({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <section className="partner-cta section-wrap"><div><p className="eyebrow">Dla pracodawców i organizacji</p><h2>Współpracuj z nami</h2><p>Razem możemy tworzyć więcej dostępnych ścieżek rozwoju zawodowego.</p></div><ButtonLink href="/kontakt/" onClick={navigate}>Porozmawiajmy <span aria-hidden="true">↗</span></ButtonLink></section> }

function Projects({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { const [filter, setFilter] = useState<'all' | ProjectStatus>('active'); const shown = useMemo(() => projects.filter(p => filter === 'all' || p.status === filter), [filter]); return <PageIntro eyebrow="Możliwości dla Ciebie" title="Projekty" text="Poznaj działania FAZ i sprawdź, gdzie możemy Cię wesprzeć." ><div className="filter-tabs" role="group" aria-label="Filtruj projekty">{([['active', 'Aktywne'], ['completed', 'Zakończone'], ['all', 'Wszystkie']] as const).map(([value, label]) => <button key={value} type="button" className={filter === value ? 'selected' : ''} onClick={() => setFilter(value)} aria-pressed={filter === value}>{label}</button>)}</div><div className="project-grid projects-list">{shown.map(project => <ProjectCard key={project.slug} project={project} navigate={navigate} />)}</div>{shown.length === 0 && <div className="empty-state"><h2>Nie znaleźliśmy projektów</h2><p>Wybierz inną kategorię lub skontaktuj się z nami.</p></div>}</PageIntro> }
function PageIntro({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children: React.ReactNode }) { return <section className="page-intro section-wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{text}</p>{children}</section> }
function ProjectDetail({ slug, navigate }: { slug: string; navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { const project = projects.find(p => p.slug === slug); if (!project) return <NotFound navigate={navigate} />; return <><section className="detail-hero section-wrap"><p className="eyebrow">{project.status === 'active' ? 'Projekt aktywny' : 'Projekt zakończony'}</p><h1>{project.title}</h1><p className="lead">{project.lead}</p><div className="detail-meta"><span><b>Dla kogo</b>{project.audience}</span><span><b>Obszar</b>{project.area}</span>{project.period && <span><b>Okres</b>{project.period}</span>}</div></section><section className="detail-body section-wrap"><div>{project.criteria && <><h2>Kryteria i zakres</h2><p>{project.criteria}</p></>}{project.support && <><h2>Oferowane wsparcie</h2><ul>{project.support.map(x => <li key={x}>{x}</li>)}</ul></>}{project.steps && <><h2>Jak dołączyć?</h2><ol>{project.steps.map(x => <li key={x}>{x}</li>)}</ol></>}</div><aside className="aside-card"><p className="eyebrow">Masz pytania?</p><h2>Porozmawiajmy o Twojej sytuacji.</h2><ButtonLink href="/kontakt/" onClick={navigate}>Skontaktuj się <span aria-hidden="true">↗</span></ButtonLink></aside></section></> }
function About({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <><PageIntro eyebrow="Poznajmy się" title="O nas" text="Od 2008 roku tworzymy warunki, w których każdy może rozwijać swój potencjał." ><div className="about-mission"><h2>Nasza misja</h2><p>FAZ wspiera przede wszystkim osoby z niepełnosprawnościami w rozwoju zawodowym, rehabilitacji oraz pełniejszym uczestnictwie społecznym. Organizujemy giełdy pracy, doradztwo zawodowe i prawne, a także szkolenia dla pracodawców i WTZ.</p><p>Jesteśmy organizacją pożytku publicznego i działamy non-profit.</p></div></PageIntro><section className="about-stats section-wrap"><p className="eyebrow">Od 2008 roku</p><div className="stats">{impactSince2008.map(item => <div className="stat" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></section><section className="timeline section-wrap"><SectionIntro eyebrow="Nasza historia" title="Krok po kroku, od 2008 do dziś" /><div className="timeline-line"><div><b>2008</b><p>Powołanie Fundacji Aktywności Zawodowej.</p></div><div><b>2011</b><p>Uzyskanie statusu organizacji pożytku publicznego.</p></div><div><b>2014</b><p>Przeniesienie siedziby do Gdyni.</p></div><div><b>2022</b><p>Powołanie Instytutu Aktywności Zawodowej.</p></div><div><b>Dziś</b><p>Łączymy doświadczenie z nowymi sposobami wspierania osób z niepełnosprawnościami.</p></div></div></section><PartnerCta navigate={navigate} /><section className="team section-wrap"><SectionIntro eyebrow="Ludzie FAZ" title="Zespół, który działa razem" /><div className="team-grid">{team.map(person => <div className="team-card" key={person.name}><div className="avatar" aria-hidden="true">{person.name.slice(0, 1)}</div><h3>{person.name}</h3><p>{person.role}</p></div>)}</div></section><ContactCta navigate={navigate} /></> }
function News({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <PageIntro eyebrow="Wiedza i inspiracje" title="Aktualności" text="Informacje o działaniach i projektach Fundacji Aktywności Zawodowej."><div className="news-list">{news.map(item => <NewsCard key={item.slug} item={item} navigate={navigate} />)}</div></PageIntro> }
function Article({ slug, navigate }: { slug: string; navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { const item = news.find(x => x.slug === slug); if (!item) return <NotFound navigate={navigate} />; return <article className="article section-wrap"><p className="eyebrow">{item.date}</p><h1>{item.title}</h1><p className="lead">{item.lead}</p><div className="article-copy"><p>Zapraszamy do zapoznania się z informacją dotyczącą działań Fundacji Aktywności Zawodowej. Aktualne informacje i szczegóły można uzyskać, kontaktując się z naszym zespołem.</p><ButtonLink href="/kontakt/" onClick={navigate}>Skontaktuj się z FAZ <span aria-hidden="true">↗</span></ButtonLink></div></article> }
function Contact() { const [values, setValues] = useState({ name: '', email: '', phone: '', message: '', consent: false }); const [errors, setErrors] = useState<Record<string, string>>({}); const [sent, setSent] = useState(false); const [copied, setCopied] = useState(false); const submit = (event: FormEvent) => { event.preventDefault(); const next: Record<string, string> = {}; if (!values.name.trim()) next.name = 'Podaj swoje imię.'; if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Podaj poprawny adres e-mail.'; if (!values.message.trim()) next.message = 'Napisz, w czym możemy pomóc.'; if (!values.consent) next.consent = 'Zaznacz zgodę, aby wysłać wiadomość.'; setErrors(next); if (!Object.keys(next).length) setSent(true) }; const copy = async () => { await navigator.clipboard?.writeText(contact.email); setCopied(true) }; return <PageIntro eyebrow="Jesteśmy do dyspozycji" title="Kontakt" text="Napisz do nas — odpowiemy i pomożemy wybrać najlepszy kolejny krok."><div className="contact-layout"><form className="contact-form" onSubmit={submit} noValidate>{sent ? <div className="success-panel" role="status"><span className="success-icon">✓</span><h2>Wiadomość jest gotowa</h2><p>Otwórz swój program pocztowy, aby wysłać ją do naszego biura. Jeśli program się nie otworzy, skopiuj adres e-mail i wyślij wiadomość ręcznie.</p><a className="button" href={`mailto:${contact.email}?subject=Kontakt%20z%20FAZ&body=${encodeURIComponent(values.message)}`}>Otwórz program pocztowy</a><button type="button" className="text-button" onClick={copy}>Skopiuj adres {copied ? '— skopiowano' : ''}</button></div> : <><Field label="Imię" name="name" value={values.name} required error={errors.name} onChange={value => setValues({ ...values, name: value })} /><Field label="E-mail" name="email" type="email" value={values.email} required error={errors.email} onChange={value => setValues({ ...values, email: value })} /><Field label="Telefon" name="phone" value={values.phone} error={errors.phone} onChange={value => setValues({ ...values, phone: value })} /><label className="field"><span>Wiadomość <b>*</b></span><textarea name="message" rows={5} value={values.message} onChange={e => setValues({ ...values, message: e.target.value })} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <small id="message-error">{errors.message}</small>}</label><label className="consent"><input type="checkbox" checked={values.consent} onChange={e => setValues({ ...values, consent: e.target.checked })} aria-invalid={Boolean(errors.consent)} /> <span>Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na wiadomość. <b>*</b>{errors.consent && <small>{errors.consent}</small>}</span></label><button className="button" type="submit">Przygotuj wiadomość <span aria-hidden="true">↗</span></button></>}</form><div className="contact-info"><OfficeInfo /><p><b>E-mail</b><a href={`mailto:${contact.email}`}>{contact.email}</a></p></div></div></PageIntro> }
function Field({ label, name, value, type = 'text', required, error, onChange }: { label: string; name: string; value: string; type?: string; required?: boolean; error?: string; onChange: (value: string) => void }) { return <label className="field"><span>{label} {required && <b>*</b>}</span><input type={type} name={name} value={value} required={required} onChange={e => onChange(e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />{error && <small id={`${name}-error`}>{error}</small>}</label> }
function OfficeInfo() { return <div className="offices">{contact.offices.map(office => <div className="office" key={office.city}><h2>{office.city}</h2><p>{office.address}</p><p>{office.phones.map(phone => <a href={`tel:${phone.replaceAll(' ', '')}`} key={phone}>{phone}</a>)}</p><p>{office.hours}</p></div>)}<p><b>Filie</b><br />{contact.branches.join(' · ')}</p></div> }
function Donate({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { const [copied, setCopied] = useState(false); const copy = async () => { await navigator.clipboard?.writeText(contact.bankAccount.replaceAll(' ', '')); setCopied(true) }; return <PageIntro eyebrow="Twoje wsparcie ma znaczenie" title="Przekaż darowiznę" text="Jako organizacja pożytku publicznego możemy skutecznie zamieniać wsparcie w realne możliwości."><div className="donation-card"><p className="eyebrow">Rachunek darowizn BNP Paribas</p><strong>{contact.bankAccount}</strong><button className="button" type="button" onClick={copy}>{copied ? 'Numer skopiowany ✓' : 'Skopiuj numer rachunku'}</button><p role="status" className="live-region">{copied ? 'Numer rachunku został skopiowany.' : ''}</p></div><div className="donation-note"><h2>Jesteśmy OPP</h2><p>Możesz przekazać nam 1,5% podatku lub darowiznę. Jeśli chcesz dowiedzieć się więcej, <a href="/kontakt/" onClick={navigate}>skontaktuj się z nami</a>.</p></div></PageIntro> }
function Join() { return <PageIntro eyebrow="Zróbmy coś razem" title="Dołącz do nas" text="Szukamy osób, które chcą dzielić się czasem, wiedzą i energią. Zapraszamy do kontaktu."><div className="join-card"><h2>Wolontariat</h2><p>Jeśli chcesz zaangażować się w działania FAZ, napisz do nas. Opowiedz, co możesz i chcesz robić.</p><a className="button" href={`mailto:${contact.email}?subject=Wolontariat%20w%20FAZ`}>Napisz w sprawie wolontariatu <span aria-hidden="true">↗</span></a></div></PageIntro> }
function NotFound({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <section className="not-found section-wrap"><p className="eyebrow">404</p><h1>Tej strony tu nie ma.</h1><p className="lead">Sprawdź adres albo wróć na stronę główną.</p><ButtonLink href="/" onClick={navigate}>Wróć na stronę główną</ButtonLink></section> }
function Footer({ navigate }: { navigate: (event: React.MouseEvent<HTMLAnchorElement>) => void }) { return <footer className="footer"><div className="section-wrap footer-top"><div><a className="logo logo-light" href="/" onClick={navigate}><img className="logo-image" src="/FAZ_logo_digital.svg" alt="Fundacja Aktywności Zawodowej" /></a><p className="footer-tagline">Praca daje sprawczość.<br />Pomagamy znaleźć własną drogę.</p></div><div className="footer-links"><div><h2>Odwiedź nas</h2><a href="/projekty/" onClick={navigate}>Projekty</a><a href="/o-nas/" onClick={navigate}>O nas</a><a href="/aktualnosci/" onClick={navigate}>Aktualności</a></div><div><h2>Porozmawiajmy</h2><a href="/kontakt/" onClick={navigate}>Kontakt</a><a href="/przekaz-darowizne/" onClick={navigate}>Darowizna</a><a href="/dolacz-do-nas/" onClick={navigate}>Wolontariat</a></div><div><h2>W sieci</h2>{contact.socials.map(s => <a href={s.href} target="_blank" rel="noreferrer" key={s.label}>{s.label} ↗</a>)}</div></div></div><div className="section-wrap footer-bottom"><span>© {new Date().getFullYear()} Fundacja Aktywności Zawodowej</span><span>KRS 0000314083 · REGON 220679576 · NIP 583 305 54 18</span></div></footer> }

export default App
