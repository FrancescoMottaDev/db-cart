# AdonisJS 7 - Folder patterns and architecture patterns (recommended)

Practical guide for organizing an AdonisJS 7 project, with a focus on an ecommerce API such as `db-cart`.

Important note:

- AdonisJS v7 requires Node.js `>= 24`.
- AdonisJS provides a clean default project structure, but it does not require a single layout forever.
- The official docs explicitly allow you to diverge from the starter layout as the project grows.

## 1. Core principle: keep framework entrypoints standard, customize the domain layer

Recommended pattern:

- Keep framework entrypoints conventional (`adonisrc.ts`, `start/*`, `config/*`, `bin/*`, `database/*`, `tests/*`).
- Organize application logic (`app/*`) in a way that matches your domain and team size.

Why this helps:

- lower friction with official docs
- easier use of Ace generators
- faster onboarding for contributors
- smoother future upgrades (v7 -> v8)

## 2. Recommended base folder structure (Adonis 7)

Standard API/server layout:

```text
.
├── adonisrc.ts
├── ace.js
├── bin/
│   ├── server.ts
│   ├── console.ts
│   └── test.ts
├── start/
│   ├── routes.ts
│   ├── kernel.ts
│   └── env.ts
├── config/
│   ├── app.ts
│   ├── auth.ts
│   ├── bodyparser.ts
│   ├── cors.ts
│   ├── database.ts
│   ├── encryption.ts
│   ├── hash.ts
│   ├── logger.ts
│   └── session.ts
├── app/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── validators/
│   ├── services/
│   ├── transformers/
│   ├── exceptions/
│   ├── policies/
│   ├── abilities/
│   ├── events/
│   └── listeners/
├── providers/
│   └── app_provider.ts
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/   (if used)
├── tests/
│   ├── unit/
│   ├── functional/
│   └── bootstrap.ts
└── .adonisjs/       (generated)
```

Notes:

- In AdonisJS v7, the official API starter kit is a monorepo (`apps/backend` + `apps/frontend`). The tree above represents the backend app layout inside that monorepo (and also works as a single-app layout reference).
- Other common top-level directories depending on the starter/features include `commands/`, `public/`, `resources/`, `types/`, and `tmp/`.

## 3. What each folder should do (recommended patterns)

## 3.1 `start/` = application wiring

Use it for:

- route registration (`start/routes.ts`)
- middleware stack setup (`start/kernel.ts`)
- env schema/validation (`start/env.ts`)

Avoid:

- business logic in `start/*`
- database queries in `start/*`

## 3.2 `config/` = typed configuration per environment

Use it for:

- framework and adapter configuration
- mapping `env -> config`

Avoid:

- reading `process.env` all over the codebase
- business calculations inside `config/*`

## 3.3 `app/controllers/` = HTTP adapters (thin layer)

Recommended pattern:

- one controller per resource or bounded context
- short methods focused on HTTP concerns
- delegate to validators + services/actions + transformers

Typical controller responsibilities:

- read `HttpContext`
- validate input
- enforce authz (policy/ability)
- call a service
- return a formatted response

## 3.4 `app/validators/` = input boundary

Recommended pattern:

- one validator per use-case
- explicit names (`CreateOrderValidator`, `UpdateCatalogPriceValidator`)
- rules/messages aligned with the API contract

Useful note from the docs:

- some duplication across validators is acceptable; avoid over-engineered reuse.

## 3.5 `app/services/` (or `app/actions/`) = business logic

This is where domain/process logic should live:

- pricing
- stock reservation
- checkout orchestration
- payment workflows
- shipping rate calculation

Recommended pattern:

- small, composable, testable services
- dependencies via DI (`@inject`)
- no direct `HttpContext` dependency except when truly needed

## 3.6 `app/models/` = persistence layer (Lucid)

Recommended pattern:

- use models for DB mapping + scopes + relations
- keep fields/relations well typed
- do not turn models into giant service objects

Rule of thumb:

- if a method touches multiple aggregates, external providers, or workflow orchestration, move it to a service.

## 3.7 `app/transformers/` (v7) = response contract layer

Highly recommended for public APIs:

- AdonisJS v7 ships official transformer support in core, so this is now a first-class pattern (the `app/transformers` folder name is still a project convention).
- separate output format from Lucid models
- normalize dates, money values, enums, and nested objects
- prevent leaking internal fields (costs, tokens, internal flags)

Recommended pattern:

- one transformer per API resource (`ProductTransformer`, `OrderTransformer`)
- dedicated list/collection transformers when you need custom pagination/meta output

## 3.8 `app/middleware/` = HTTP cross-cutting concerns

Recommended pattern:

- small middleware with a single responsibility
- `server.use` for global concerns
- `router.use` for baseline route middleware
- named middleware for selective app policies

Ecommerce examples:

- `force_json_response_middleware`
- tenant/store resolver
- correlation/request-id enrichment
- audit context middleware

## 3.9 `app/exceptions/` = error mapping and rendering

Recommended pattern:

- centralize rendering/logging in the global exception handler
- distinguish validation, auth, domain, and integration errors

Goal:

- consistent error payloads across the entire API

## 3.10 `database/` = schema and data bootstrap

Recommended pattern:

- atomic and reversible migrations
- idempotent seeders where possible (especially reference data)
- separate demo seeders from minimum bootstrap seeders

For `db-cart`:

- keep separate seeders for catalog, pricing, shipping, payments, roles/permissions

## 3.11 `tests/` = tests by responsibility level

Recommended pattern:

- `unit/`: pure logic (services/helpers)
- `functional/`: endpoints/controllers + app integration
- `e2e/` (if you add it later): multi-step end-to-end workflows

Best practice:

- reset DB state with Adonis test utilities (`testUtils.db()` strategy per suite)
- use minimal fixtures/seeders per test case

## 3.12 `.adonisjs/` = generated code (v7)

Recommended pattern:

- do not edit manually
- regenerate through hooks/codegen when source changes
- use it as type-safety/metadata support, not application source
- expect generated server-side metadata/helpers under `.adonisjs/server/*` (including controller barrel generation and route-related typing support)
- expect generated client-facing shared types under `.adonisjs/client/*` (used for frontend-safe URL generation and shared contracts)

## 3.13 `providers/` = framework bindings and boot-time extensions

Recommended pattern:

- keep framework bindings, macros, and boot-time setup in top-level providers (for example `providers/app_provider.ts`)
- use providers for container registrations and framework extensions instead of scattering setup across controllers/services
- keep provider responsibilities explicit (bindings, macros, listeners registration, startup hooks)

## 4. Recommended architecture patterns (Adonis 7 + general)

## 4.1 Request flow pattern (recommended)

Pattern:

1. `Route`
2. `Middleware`
3. `Controller`
4. `Validator`
5. `Policy/Ability` (when needed)
6. `Service/Action`
7. `Model/Query`
8. `Transformer`
9. `Response`

Why it works:

- clear responsibilities
- easier testing
- safer refactoring

## 4.2 Thin Controllers / Rich Services

Recommended pattern:

- thin controllers
- focused, capable services
- Lucid models not overloaded with workflow logic

Anti-pattern:

- controller methods that do validation, queries, business logic, serialization, and logging all at once.

## 4.3 Dependency Injection first

Recommended pattern:

- constructor injection with `@inject()`
- service providers for bindings/framework extensions
- avoid ad-hoc global singletons

When to use the container directly:

- bootstrap, commands, providers, dynamic resolution cases

## 4.4 Config-driven application

Recommended pattern:

- every external integration reads from `config/*`
- `start/env.ts` validates required env vars at startup

Benefit:

- fail fast in development/CI

## 4.5 Policies/abilities for authorization

Recommended pattern:

- move authorization out of controllers when rules grow
- use domain-oriented ability/policy names (`manageCatalog`, `refundOrder`, `fulfillShipment`)

## 4.6 Events/listeners for side effects

Recommended pattern:

- decouple secondary effects using events/listeners
- keep the core service focused on the primary workflow

Ecommerce examples:

- `order.placed`
- `payment.captured`
- `shipment.created`
- `inventory.low_stock`

## 4.7 API response contracts via transformers

Recommended pattern:

- controllers should not know complex serialization details
- transformers centralize the public response format
- easier versioning and backward compatibility

## 4.8 Import boundaries with subpath imports

Recommended pattern:

- use `#...` aliases in `package.json` (`#models/*`, `#services/*`, `#transformers/*`, `#database/*`, `#generated/*`)
- avoid long `../../../../` import chains

Benefits:

- easier refactors
- more readable imports

## 4.9 Avoid blanket barrel-file usage

Recommended pattern:

- avoid broad app-level barrel files in critical paths unless you measure the cost
- prefer explicit imports in bootstrap/routing paths
- framework-generated barrels inside `.adonisjs/*` are fine; this warning is about app-authored blanket barrel files

## 5. Recommended folder pattern for `db-cart` (practical proposal)

You already have a large DB schema, so the biggest risk is ending up with oversized controllers. A hybrid pattern is a good fit:

## 5.1 Keep the standard Adonis layout

- Keep `start/*`, `config/*`, `database/*`, `tests/*` conventional
- Keep all Lucid models in `app/models/*`

## 5.2 Introduce domain modules progressively (without breaking everything)

Add `app/modules/` for complex flows:

```text
app/modules/
├── catalog/
│   ├── services/
│   ├── validators/
│   ├── transformers/
│   └── policies/
├── cart/
│   ├── services/
│   ├── validators/
│   └── transformers/
├── checkout/
│   ├── services/
│   ├── actions/
│   └── transformers/
├── orders/
│   ├── services/
│   ├── policies/
│   └── transformers/
└── inventory/
    ├── services/
    ├── actions/
    └── events/
```

Why this works well:

- it keeps Adonis generators and conventions usable
- it reduces complexity in application layers
- it prepares the project for open-source collaboration by domain area

## 6. Practical naming conventions (recommended)

- Controller: `ProductsController`, `OrdersController`
- Validator: `CreateProductValidator`, `UpdateOrderStatusValidator`
- Service: `CreateOrderService`, `ReserveStockService`
- Action (if you use actions): `CapturePaymentAction`
- Transformer: `OrderTransformer`, `OrderSummaryTransformer`
- Policy: `OrderPolicy`
- Event class/name: `OrderPlaced`, `PaymentCaptured`

## 7. Common anti-patterns to avoid

- business logic in controllers
- API responses generated directly from models with no shaping layer
- `process.env` scattered across the codebase
- middleware with hidden side effects
- deep fragile relative imports
- barrel files everywhere
- organizing folders only by "technical type" once the domain is large, without a domain plan (this usually becomes chaos)

## 8. Official sources and references

- Project structure (docs): https://docs.adonisjs.com/guides/getting-started/folder-structure
- Controllers (docs): https://docs.adonisjs.com/guides/basics/controllers
- Validation (docs): https://docs.adonisjs.com/guides/basics/validation
- HTTP context (docs): https://docs.adonisjs.com/guides/basics/http-context
- Routing (docs): https://docs.adonisjs.com/guides/basics/routing
- Dependency injection (docs): https://docs.adonisjs.com/guides/concepts/dependency-injection
- Service providers (docs): https://docs.adonisjs.com/guides/concepts/service-providers
- `adonisrc.ts` (docs): https://docs.adonisjs.com/guides/concepts/adonisrc-file
- Assembler hooks (docs): https://docs.adonisjs.com/guides/concepts/assembler-hooks
- Logger (docs): https://docs.adonisjs.com/guides/digging-deeper/logger
- Testing and DB reset state (docs): https://docs.adonisjs.com/guides/testing/database
- AdonisJS v7 announcement (blog): https://adonisjs.com/blog/adonisjs-v7-announcement
