# Bar2Bar Workspace Instructions

## Purpose

Bar2Bar, displayed in the UI as **Bucks2Bar**, is a browser-only monthly income and expense tracker. The app has three active user-facing behaviors that changes must preserve:

- a username form with rule-based validation and exact feedback messages
- a 12-row monthly income/expense data table generated at runtime
- a lazily rendered Chart.js bar chart that can be downloaded as a PNG

## Working Rules

- Keep the app simple: no backend, no routing, no build step, no framework migration.
- Use the existing stack only: `home.html`, `script.js`, Bootstrap CDN, Chart.js CDN, Jest for tests.
- Do not introduce npm runtime dependencies, bundlers, transpilers, or persistence layers.
- Keep JavaScript in `script.js` and preserve the current IIFE-based structure.
- Use `const` and `let`; do not introduce `var`.

## Important Invariants

- `buildRows()` must continue to create 12 months of inputs inside `#inputBody`.
- Numeric inputs use IDs `income-0` through `income-11` and `expense-0` through `expense-11`.
- Negative numeric values must reset to `0` and add the Bootstrap `is-invalid` class.
- Chart rendering must stay lazy: the chart is created or refreshed only when the Chart tab is shown or its actions require it.
- The download button must continue exporting the chart as `bucks2bar-chart.png`.
- All primary buttons must remain pink-based `btn btn-primary` buttons with white text.

## Username Validation Contract

- The username rule is: trimmed length of at least 5, at least 1 uppercase letter, and at least 1 special character.
- Validation behavior is shared between UI and tests through `validateUsername`.
- Keep these exact messages stable unless tests are intentionally updated:
  - `Username is valid and matches the required pattern.`
  - `Username must be at least 5 characters long.`
  - `Username must contain at least 1 uppercase letter.`
  - `Username must contain at least 1 special character.`
  - `Username must be at least 5 characters long and include 1 uppercase letter and 1 special character.`

## Testability Requirements

- `script.js` must remain importable in Jest's Node environment.
- Browser-only startup code must stay guarded so requiring `script.js` does not assume `document` exists.
- Keep `module.exports = { validateUsername }` available for tests unless the test strategy is intentionally changed.
- When changing username validation, rerun `script.test.js`.

## Styling Direction

- Use Bootstrap utilities first; add custom CSS only in the `<style>` block in `home.html` when needed.
- Preserve the established visual language: blue header gradient, white cards, rounded corners, subtle shadows, pink primary actions.
- Keep the page usable as a single static file opened directly in a browser.
