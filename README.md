# Playwright UI and API Automation

Playwright Test project for Amazon UI checks and Petstore API CRUD tests.

## Requirements

- Node.js 18 or later
- npm

## Setup and run

```sh
npm install
npx playwright install chromium
npm test
```

Run only the Amazon UI test with `npm run test:ui` or only the API test with
`npm run test:api`. Both suites use Playwright Test and TypeScript.

The Amazon page object, locators, and actions are in `tests/ui/amazon.page.ts`;
the UI scenario is in `tests/ui/Amazom.spec.ts`. Passing-test screenshots are
saved in `screenshots/` and attached to the HTML report. Playwright also captures
a screenshot and retains a trace when a browser test fails.

The API CRUD test is in `tests/api/petstore.api.spec.ts`. It uses the browser
context's request client so API activity can be included in a retained failure
trace. The UI and API base URLs can be overridden with `SHOPPING_BASE_URL` and
`PETSTORE_API_URL`.

The HTML report is generated after a test run. Open it with:

```sh
npx playwright show-report
```
