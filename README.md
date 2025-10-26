# Thwordle

[Wordle](https://www.powerlanguage.co.uk/wordle/) clone, but it's Thai.

## Setup

- Clone/fork this repository
- `yarn` or `npm install`
- `yarn dev` or `npm run dev`

## What's included

- Svelte (TypeScript), built with [Vite](https://vitejs.dev)
- TailwindCSS v3
- [Ko-fi](https://ko-fi.com)
- [Jest](https://jestjs.io) & [@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library)
- etc.

## End-to-End Testing (Playwright)

Uses [Playwright](https://playwright.dev) for E2E testing.  
Run `npm run e2e:install` and then `npm run e2e`.

Currently covers win/lose scenarios.