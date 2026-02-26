# AdonisJS v7 - Best Practices and What's New (practical guide for `db-cart`)

This is a practical guide for the `db-cart` team (ecommerce API project), focused on:

- what changed in AdonisJS v7 vs v6
- day-to-day best practices for clean and maintainable APIs
- migration and post-migration pitfalls to avoid

## 1. Baseline requirements (v7)

- Node.js `>= 24` is a real runtime requirement (not just a suggestion). Set a clear baseline using `.nvmrc`, `.node-version`, or `engines` in `package.json`.
- Use a single package manager for the repo. If you choose `pnpm`, keep `pnpm-lock.yaml` as the canonical lockfile.
- Do not manually edit generated Adonis files (`.adonisjs/*`). Treat them as generated output.

## 2. Important v7 changes (v6 -> v7)

## 2.1 Codegen and hooks in `adonisrc.ts`

- In v7, using `defineConfig` hooks for indexing/codegen is the recommended approach (for example `indexEntities()`).
- This improves DX, type safety, and discovery (especially for models, validators, transformers, policies, and Inertia pages).
- For API-only projects like `db-cart`, the minimum useful setup is:
  - `hooks.init: [indexEntities()]`

Best practice:

- Keep hooks lightweight and declarative.
- Use dynamic `import()` for build/dev hooks when required by the assembler docs.

## 2.2 New TypeScript runtime for Ace and local development

- The old `ts-node` / `ts-node-maintained` setup is replaced by `@poppinss/ts-exec`.
- In `ace.js`, the TS bootstrap should use `import '@poppinss/ts-exec'`.

Best practice:

- Do not stack custom TS runtime hooks unless you really need them.
- Keep `ace.js` minimal and close to the official template.

## 2.3 URL generation: use `urlFor` instead of legacy helpers

- v7 moves toward `urlFor(...)` (server/client URL builder) instead of legacy APIs like `router.makeUrl(...)`.
- In Edge templates, v7 migration also requires replacing `route(...)` with `urlFor(...)` where applicable.

Best practice:

- Prefer named routes and centralized URL generation.
- Avoid hardcoded URL strings in controllers, services, and frontend code.

## 2.4 Encryption config is now separate

- Encryption key configuration moves to `config/encryption.ts`.
- `config/app.ts` should no longer export `appKey`.

Best practice:

- Keep migration compatibility using the `legacy` driver with `APP_KEY`.
- Plan key rotation later using multiple keys in `keys: [...]` once production usage stabilizes.

## 2.5 Request/Response naming changes (macros/extensions)

- In v7, the classes/types to extend are `HttpRequest` and `HttpResponse` (not `Request` / `Response`).

Best practice:

- If you extend the framework (macros/getters), centralize extensions in providers and use typed module augmentation.

## 2.6 Transformers are a first-class pattern in v7

- Adonis v7 pushes stronger support for `transformers` and related imports (`#transformers/*`).
- This helps separate API serialization from domain logic and persistence models.

Best practice (strongly recommended for ecommerce APIs):

- Use transformers for public HTTP payloads (`Product`, `Cart`, `Order`, `Customer`).
- Avoid `return model` directly from controllers when the API contract must stay stable.
- Version payloads at the transformer layer if the API becomes public/open-source-facing.

## 2.7 Inertia changes (only if you use Inertia)

- In v7, Inertia shared data moves to middleware (not `config/inertia.ts`).
- Some config keys/layout patterns changed (for example `encryptHistory`, entrypoint placement).

Best practice:

- If you later add an admin panel with Inertia, keep JSON API middleware and web/Inertia middleware clearly separated.

## 2.8 Test globs and assembler hook names

- Test globs in `adonisrc.ts` now use brace expansion (`*.spec.{ts,js}`) instead of parenthesized alternation.
- Some assembler hooks were renamed during the v7 migration path.

Best practice:

- Keep glob patterns consistent across all suites (`unit`, `functional`, `e2e`).

## 2.9 Error reporting tooling (`youch`)

- `youch` is expected in v7 setups for rich error formatting during development.

Best practice:

- Keep `youch` as a dev dependency and avoid custom ad-hoc error formatters unless you have a clear requirement.

## 3. v7 best practices for an ecommerce API project (`db-cart`)

## 3.1 Thin controllers, business logic in services/actions

- Controllers should parse input, enforce auth/authz, orchestrate briefly, and return a response.
- Business logic (pricing, stock, checkout, order state transitions) should live in `app/services/*` or domain modules.
- Validate input before entering domain logic.

Rule of thumb:

- If a controller method grows beyond ~30-40 lines with business branching, extract to a service/action.

## 3.2 Validation as the input boundary

- Use validators for HTTP requests.
- Adonis docs explicitly tolerate some duplication across validators; avoid giant reusable validators that become fragile.

Best practice:

- One validator per use-case (for example `CreateProductValidator`, `UpdateStockValidator`).
- Messages and rules should reflect the API contract, not internal DB schema details.

## 3.3 Dependency injection and container usage

- Prefer `@inject()` and constructor injection for services with dependencies.
- Use service providers for bindings/framework extensions, not static global controller helpers.

Best practice:

- Keep services stateless when possible.
- Use the container at the edges (framework, commands, route handlers), not in every function.

## 3.4 Request-aware logging

- Use `ctx.logger` / `request.logger` for logs correlated with the HTTP request.
- Avoid `console.log` in application code.

Best practice:

- Log key business events with structured fields (`orderId`, `customerId`, `paymentProvider`, `correlationId`).

## 3.5 Route naming and API contracts

- Give routes consistent names.
- Centralize URL creation with `urlFor`.
- Keep REST naming consistent (`index`, `show`, `store`, `update`, `destroy`) or use explicit use-case endpoints for complex flows (`checkout`, `capturePayment`, `cancelOrder`).

## 3.6 Shape responses with transformers

- Treat Lucid models as persistence models, not public API contracts.
- Use transformers to hide internal fields, normalize dates/money, and preserve backward compatibility.

## 3.7 Config and env discipline

- Everything environment-dependent belongs in `config/*.ts` + `start/env.ts`.
- Do not read `process.env` directly inside services/models/controllers.

## 3.8 Keep middleware layering clear

- `server.use(...)`: global cross-cutting concerns (CORS, tracing, headers, etc.).
- `router.use(...)`: HTTP middleware for registered routes (bodyparser, session/auth init if needed).
- `router.named(...)`: explicitly applied middleware for routes/groups.

Best practice:

- Keep middleware idempotent and single-purpose.

## 3.9 Be careful with barrel files

- Adonis guidance warns about barrel files because of startup time, type-checking cost, and coupling.

Best practice:

- Import modules directly in hot paths (routing, bootstrap, providers).
- If you use barrel files, limit them to stable layers or tooling internals.

## 4. Quick checklist for new `db-cart` features (v7-ready)

Use this checklist for every new API endpoint:

1. Named route with clear version/namespace.
2. Dedicated validator (input boundary).
3. Auth/authz applied (middleware + policy/ability when needed).
4. Service/action for business logic.
5. Transformer for public response payload.
6. Structured logs using `ctx.logger`.
7. Tests (at least functional) for happy path and failure path.

## 5. Common pitfalls after migrating to v7

- Running on Node <24: it may appear to work in some cases, but it is not supported.
- Forgetting `hooks.init` in `adonisrc.ts`, so you miss useful indexing/codegen.
- Keeping hardcoded URLs or legacy route helper usage.
- Returning raw Lucid models in public API endpoints.
- Mixing HTTP logic, business logic, and DB queries in the same controller method.

## 6. Official sources (recommended)

- AdonisJS v7 release blog: https://adonisjs.com/blog/adonisjs-v7-announcement
- AdonisJS docs - Project structure: https://docs.adonisjs.com/guides/getting-started/folder-structure
- AdonisJS docs - Controllers: https://docs.adonisjs.com/guides/basics/controllers
- AdonisJS docs - Validation: https://docs.adonisjs.com/guides/basics/validation
- AdonisJS docs - Dependency injection: https://docs.adonisjs.com/guides/concepts/dependency-injection
- AdonisJS docs - Service providers: https://docs.adonisjs.com/guides/concepts/service-providers
- AdonisJS docs - HTTP context: https://docs.adonisjs.com/guides/basics/http-context
- AdonisJS docs - Logger: https://docs.adonisjs.com/guides/digging-deeper/logger
- AdonisJS docs - `adonisrc.ts`: https://docs.adonisjs.com/guides/concepts/adonisrc-file
- AdonisJS docs - Assembler hooks: https://docs.adonisjs.com/guides/concepts/assembler-hooks
