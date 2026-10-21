# Playwright UI and API Automation

Standalone Playwright Test project for shopping-site UI checks and Petstore API CRUD tests.

## Requirements

- Node.js 18 or later
- npm

## Setup and run

```sh
npm install
npx playwright install chromium
npm test
```

Run only the UI tests with `npm run test:ui` or only the API tests with `npm run test:api`. Both suites use Playwright Test and TypeScript.

The UI locators and page actions are in `tests/ui/page.ts`, with test cases in `tests/ui/shopping.spec.ts`. The API CRUD tests are in `tests/api/petstore.api.spec.ts`. The UI suite uses Amazon India and saves full-page screenshots in `test-results`. The API suite uses the public Petstore API. Override the defaults with `SHOPPING_BASE_URL` and `PETSTORE_API_URL` environment variables.
