# Fundacja Aktywności Zawodowej

Statyczna witryna FAZ zbudowana w Astro. Serwis przedstawia metodę budowania tożsamości zawodowej, projekty, historie praktyki, publikacje oraz dostępne drogi kontaktu.

## Uruchomienie

```sh
npm ci
npm run dev
```

Aplikacja lokalna jest dostępna domyślnie pod `http://localhost:4321`.

## Sprawdzenie jakości

```sh
npm run check
npm run build
node --test worker/contact.test.mjs
npm test
```

Testy przeglądarkowe używają systemowej przeglądarki Chrome i sprawdzają strukturę dokumentów, dostępność axe, linki wewnętrzne, widok 320 px, formularz oraz wyszukiwarkę.

## Formularz kontaktowy

Backend znajduje się w `worker/` i działa pod `/api/contact`. Wymaga skonfigurowania sekretów wdrożenia:

- `RESEND_API_KEY`
- `CONTACT_RECIPIENT`
- `CONTACT_FROM`

Bez kompletu wartości formularz kończy działanie bez wysłania wiadomości i zwraca informację o niedostępności. Treść strony oraz bezpośrednie dane telefoniczne i e-mailowe działają niezależnie od workera.
