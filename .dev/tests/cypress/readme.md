# CoBlocks Integration Tests

**Powered by Cypress.io**

https://dashboard.cypress.io/#/projects/sovnn2/runs

Welcome to our end-to-end testing suite for CoBlocks blocks! There are a number of helper methods inside of `.dev/tests/cypress/helpers.js` that make certain repetitive tasks easier (e.g. Adding a block a page, validating no errors exists in the editor window, opening a settings panel, etc.)

### Add your local test credentials
```bash
$ echo '{
  "testURL": "https://localhost:8889",
  "wpUsername": "admin",
  "wpPassword": "password",
}' > cypress.env.json
```

### Open Cypress to run individual block tests
```bash
$ npm install
$ npx cypress open
```

### Run all block tests locally from the command line
```bash
$ npx cypress run --browser chrome --config video=false
```
