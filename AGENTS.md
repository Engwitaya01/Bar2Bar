# Bar2Bar Agent Guide

## Project Purpose

Bar2Bar, labeled **Bucks2Bar** in the UI, is a static single-page finance tracker for entering monthly income and expenses, validating a username, viewing those values in a bar chart, and downloading the chart as an image. The project is intentionally small and browser-only.

## What Exists Today

- A username form at the top of the page with client-side validation feedback.
- A data tab containing 12 generated month rows for income and expense entry.
- A chart tab that renders a grouped income-versus-expense bar chart.
- A download button that exports the rendered chart to PNG.
- A Jest test file focused on `validateUsername` behavior.

## Source of Truth by File

- `home.html`: all markup, Bootstrap CDN imports, Chart.js CDN import, and the inline CSS theme.
- `script.js`: all runtime behavior, DOM wiring, validation, chart creation, chart download, and the test-exported `validateUsername` helper.
- `script.test.js`: expected username validation behavior and exact user-facing messages.
- `jest.config.js`: current Jest environment configuration.
- `README.md`: currently minimal and not a reliable source of implementation detail.

## Architecture Requirements

- Keep application logic in the single existing IIFE inside `script.js`.
- Avoid architectural upgrades unless explicitly requested: no framework conversion, no modules, no bundler, no backend.
- The app must still work by opening `home.html` directly in a browser.
- Dependencies must remain CDN-based in the page and minimal in development tooling.

## Behavioral Requirements

- `buildRows()` must populate all 12 months on page load.
- Income and expense inputs must remain editable numeric fields with IDs `income-{index}` and `expense-{index}`.
- Negative entries must be corrected to `0` and marked invalid.
- `readValues()` must continue clamping DOM values to non-negative numbers.
- The chart should be created lazily and refreshed when the user revisits the Chart tab.
- The PNG download flow must continue to work without a server.

## Username Validation Requirements

- Validation is based on the trimmed username value.
- A valid username must have at least 5 characters, at least 1 uppercase letter, and at least 1 special character.
- The helper `validateUsername` is the behavioral contract for both tests and UI feedback.
- When both uppercase and special-character rules fail, the returned message must be the combined general error.
- Exact messages matter because tests assert on them.

## Test Guidance

- `script.js` must be safe to require in Node-based Jest runs.
- Keep browser bootstrap logic guarded behind a `document` existence check.
- Keep `module.exports = { validateUsername }` available unless tests are intentionally redesigned.
- After changing username validation, run `script.test.js`.
- Prefer extracting pure helpers for future logic that needs unit tests.

## UI and Style Constraints

- Preserve Bootstrap 5 usage and the current visual direction.
- Header styling should stay blue-gradient based.
- Cards should stay rounded with a light shadow.
- Primary actions must remain pink `btn btn-primary` buttons with white text.
- Use Bootstrap utilities first and keep custom CSS in the `home.html` `<style>` block.

## Change Strategy

- Make focused edits and preserve existing IDs, selectors, and user flows.
- Do not add persistence, authentication, APIs, or server assumptions unless explicitly requested.
- Update tests when behavior intentionally changes; otherwise treat existing tests as part of the spec.
