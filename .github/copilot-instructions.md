# Bar2Bar – Project Guidelines

## Project Overview

Bar2Bar (displayed as **Bucks2Bar**) is a single-page, client-side web app for tracking monthly income and expenses. There is no backend, no build step, and no package manager.

## Stack

| Layer   | Technology                                                  |
| ------- | ----------------------------------------------------------- |
| Markup  | Vanilla HTML5 (`home.html`)                                 |
| Logic   | Vanilla JavaScript ES6+ (`script.js`, IIFE, `"use strict"`) |
| Styling | Bootstrap 5.3 (CDN) + inline `<style>` in `home.html`       |
| Charts  | Chart.js 4.4 (CDN)                                          |

## Architecture

- All app logic lives in `script.js` wrapped in a single IIFE.
- The DOM is populated dynamically: `buildRows()` injects 12 month rows into `#inputBody` at page load.
- Chart state is held in the module-level `chart` variable; `ensureChart()` creates or refreshes it lazily when the Chart tab is shown.
- There is no routing, no state management library, and no module bundler.

## Code Conventions

- Keep all JavaScript inside the existing IIFE in `script.js`; do not introduce ES modules or `import/export`.
- Use `const`/`let`, arrow functions, and template literals — no `var`.
- Input IDs follow the pattern `income-{0-11}` and `expense-{0-11}` (zero-indexed by month).
- Monetary values are always clamped to `>= 0` and formatted with two decimal places (`toFixed(2)`).
- Validation resets negative inputs to `0` and applies the Bootstrap `is-invalid` class.
- Do not add external libraries, npm packages, or a build system.

## Styling

- Use Bootstrap 5 utility classes first; only add custom CSS in the `<style>` block of `home.html` when Bootstrap cannot cover the need.
- Brand colors: primary blue `#1a73e8`, dark blue `#0d47a1`, header gradient `135deg, #1a73e8 → #0d47a1`.
- Cards use `border-radius: 12px` and `box-shadow: 0 2px 12px rgba(0,0,0,0.09)`.
- UI elements all button must be a pink shade of `#e91e63` with white text, and use the `btn` and `btn-primary` classes.

## File Structure

```
home.html   – Single HTML page (markup + styles)
script.js   – All app logic (IIFE)
README.md   – Project description
```

## Key Constraints

- No backend, no server required — open `home.html` directly in a browser.
- CDN-only dependencies; do not download or vendor libraries.
- All data is ephemeral (in-memory only); there is intentionally no persistence layer.
