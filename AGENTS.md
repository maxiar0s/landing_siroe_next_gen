# AGENTS.md

Repository guide for agentic coding tools working in this project.

## Project Snapshot

- Stack: Angular 17 (standalone components), TypeScript (strict), Karma + Jasmine.
- App type: single-page marketing landing for SIROE staffing offering.
- Entry point: `src/main.ts` bootstraps `AppComponent`.
- Global styles: `src/styles.css`.
- Output: `dist/siroe-staffing`.
- Base-href production variant for deployment in subpath `/staffing`.

## Source Layout

- `src/app/app.component.ts`: top-level composition.
- `src/app/components/*.component.ts`: section-level UI components.
- `src/app/analytics.service.ts`: event tracking abstraction.
- `src/app/reveal.directive.ts`: scroll reveal behavior.
- `src/index.html`: meta tags + font imports.
- `staffing/`: legacy static HTML reference (do not treat as primary runtime).

## Setup Commands

```bash
npm install
```

## Run Commands

```bash
# Dev server (default Angular dev config)
npm start

# Production build
npm run build

# Production build for deployment under /staffing
npm run build:staffing
```

## Test Commands

```bash
# Run all tests (watch mode by default)
npm test

# Run all tests once in CI/headless style
npm test -- --watch=false --browsers=ChromeHeadless

# Run a single spec file
npm test -- --include="src/app/components/contact-section.component.spec.ts"

# Run a subset by glob
npm test -- --include="src/app/components/**/*.spec.ts"
```

Notes:
- No `.spec.ts` files currently exist; create tests before using single-test commands.
- `--include` is the preferred way to target one spec in this Angular/Karma setup.

## Lint / Typecheck

There is currently no ESLint target configured in `package.json` or `angular.json`.

Use these safety checks before finishing major changes:

```bash
# Compile-time validation
npm run build

# Optional direct TS check
npx tsc -p tsconfig.app.json --noEmit
```

If you add linting tooling later, update this document and scripts accordingly.

## Coding Standards

### TypeScript Strictness

- Respect strict mode from `tsconfig.json`.
- Always add explicit return types for public methods (`: void`, `: Promise<void>`, etc.).
- Avoid `any`; prefer exact interfaces, union types, or `unknown` plus narrowing.
- Keep `readonly` on immutable properties and injected dependencies.
- Favor small, focused methods with early returns.

### Angular Patterns

- Use standalone components/directives (current project convention).
- Keep feature UI split by section component under `src/app/components/`.
- Prefer dependency injection via constructor with `private readonly` fields.
- Keep cross-cutting behavior in services/directives (not duplicated in components).
- Keep templates accessible (`aria-*`, semantic tags, form labels, status messaging).

### Templates

- Use Angular template binding rather than manual DOM updates.
- Keep template logic light; move heavy logic to component class methods.
- Preserve IDs and anchors used for in-page navigation (`#adn-ia`, `#staffing`, etc.).
- Maintain CTA tracking hooks by using component event handlers calling `AnalyticsService`.

### Styling

- Primary styling lives in `src/styles.css` (global design system for this app).
- Reuse existing CSS variables in `:root` before adding new color tokens.
- Preserve responsive breakpoints and reduced-motion support.
- Keep visual style modern AI-themed unless user requests otherwise.

### Naming Conventions

- Component files: `kebab-case.component.ts`.
- Directive files: `kebab-case.directive.ts`.
- Service files: `kebab-case.service.ts`.
- Component classes: `PascalCaseComponent`.
- Methods/properties/variables: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` only when true constants are shared.

### Imports and File Hygiene

- Group imports: Angular/core first, Angular/common/forms next, local imports last.
- Prefer single quotes in TS to match existing codebase style.
- Remove unused imports and dead code immediately.
- Avoid creating duplicate utilities when one already exists.

### Error Handling

- Use `try/catch` around async network calls.
- On user-facing failures, set clear feedback text and track error analytics.
- Do not swallow errors silently.
- Use safe fallbacks in browser APIs (already done in reveal behavior).

## Domain-Specific Requirements

- Keep required business terms visible in content:
  - `SIROE Next-Gen`
  - `Staffing IA`
  - `TaaS (Talent as a Service)`
  - `ADN IA`
  - `AI Toolkit 2026`
  - `AI-Powered`
- Preserve WhatsApp CTA behavior and pre-filled message.
- Preserve contact flow to `comercial@siroe.cl` unless explicitly changed.
- Preserve analytics events:
  - `cta_staffing_click`
  - `cta_adn_ia_click`
  - `whatsapp_button_click`
  - `form_submit_success`
  - `form_submit_error`

## Agent Workflow Expectations

- Before editing, inspect affected component + service + styles together.
- After edits, run at least `npm run build`.
- For behavior changes, add/update tests when test infra is present.
- Keep changes scoped; do not refactor unrelated sections.
- Update `README.md` and this file when commands or structure change.

## Rules Files Check

- `.cursorrules`: not found.
- `.cursor/rules/`: not found.
- `.github/copilot-instructions.md`: not found.

If any of those files are added later, incorporate their guidance here and treat them as higher-priority repo conventions.
