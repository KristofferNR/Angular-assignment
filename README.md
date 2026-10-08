# FreakyGames

A modern e-commerce Single Page Application (SPA) built with Angular and an integrated Node.js/Express REST API. The project demonstrates declarative reactivity using Angular Signals, modern routing architecture, and persistent SQLite data handling.

---

## Technical Overview

### Frontend
- Framework: Angular (v17+) with Standalone Components
- State & Reactivity: Angular Signals (`signal`, `computed`, `effect`, `input`, `toSignal`)
- API Communication: Declarative data fetching via `httpResource` and `HttpClient`
- Styling: Tailwind CSS
- Routing: Angular Router with `withComponentInputBinding` and URL-synced state

### Backend
- Runtime & Framework: Node.js, TypeScript, and Express
- Database: SQLite via `better-sqlite3` (running in WAL mode for optimized concurrency)
- Security: Parameterized SQL queries (prepared statements) preventing SQL injection, alongside handled unique constraint violations (e.g., duplicate SKUs)

---

## Key Features

- Product Catalog & Grid: Responsive product rendering including dynamic loading state management.
- Product Details (`/products/:slug`): Route-based data fetching by slug, related products retrieval, and active document title updates via Angular's `Title` service.
- Reactive Search (`/search?q=...`): URL query parameter synchronization using `ActivatedRoute` and `toSignal`. Case-insensitive querying (`LOWER()`) in SQLite with full Swedish character support.
- Admin Dashboard & Optimistic UI Updates: Product creation and deletion workflows. Deleted items are immediately excluded from the UI using a derived `computed()` signal filter, eliminating unnecessary re-fetch requests.
- Global State via Services: Decoupled business logic inside root-provided Angular Services (`providedIn: 'root'`) to share state seamlessly across views.

---

## Architecture & Design Patterns

### Component Separation
The project follows the Separation of Concerns principle:
- Container / Smart Components: Orchestrate API requests, resolve route parameters, and coordinate application state (`Home`, `ProductDetail`, `Search`, `AdminProducts`).
- Presentational / Dumb Components: Reusable UI units receiving data strictly via signal inputs (`ProductCard`).
