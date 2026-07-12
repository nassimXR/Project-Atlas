# Project Atlas - Repository Structure

Version: 1.0

---

# 1. Repository Overview

Project Atlas follows a **Modular Monolith** architecture with clear module boundaries based on Domain-Driven Design (DDD).

Each business capability is isolated into its own module while sharing the same deployment unit.

The repository is organized so that future migration to microservices requires minimal restructuring.

---

# 2. Root Directory

```text
project-atlas/

├── apps/
├── packages/
├── docs/
├── infrastructure/
├── scripts/
├── tests/
├── .github/
├── .vscode/
├── docker/
├── prisma/
├── .env.example
├── docker-compose.yml
├── package.json
├── tsconfig.base.json
├── README.md
└── LICENSE
```

---

# 3. apps/

Contains executable applications.

```text
apps/

├── api/
├── web/              (future React frontend)
├── admin/            (future admin panel)
└── publisher/        (future publisher portal)
```

Initially only **api/** is required.

---

# 4. apps/api

```text
api/

├── src/
├── test/
├── package.json
├── tsconfig.json
└── nest-cli.json
```

---

# 5. src/

```text
src/

├── bootstrap/
├── config/
├── modules/
├── shared/
├── infrastructure/
├── main.ts
└── app.module.ts
```

---

# 6. bootstrap/

Responsible for application startup.

```text
bootstrap/

├── app.bootstrap.ts
├── swagger.bootstrap.ts
├── validation.bootstrap.ts
├── logger.bootstrap.ts
└── metrics.bootstrap.ts
```

---

# 7. config/

Application configuration.

```text
config/

├── app.config.ts
├── auth.config.ts
├── database.config.ts
├── cache.config.ts
├── mail.config.ts
├── storage.config.ts
├── queue.config.ts
└── validation.ts
```

---

# 8. modules/

Business modules.

```text
modules/

├── identity/
├── users/
├── catalog/
├── store/
├── orders/
├── payments/
├── licensing/
├── library/
├── downloads/
├── community/
├── publisher/
├── notifications/
├── administration/
└── analytics/
```

---

# 9. Module Structure

Every module uses the same internal layout.

```text
catalog/

├── presentation/
├── application/
├── domain/
├── infrastructure/
├── catalog.module.ts
└── index.ts
```

---

# 10. Presentation Layer

```text
presentation/

├── controllers/
├── dto/
├── requests/
├── responses/
├── validators/
├── guards/
├── interceptors/
└── presenters/
```

Responsibilities:

- REST controllers
- Request validation
- Response formatting
- Authentication guards

---

# 11. Application Layer

```text
application/

├── commands/
├── queries/
├── handlers/
├── use-cases/
├── mappers/
├── services/
└── events/
```

Responsibilities:

- Execute business use cases
- Coordinate workflows
- Publish domain events

---

# 12. Domain Layer

```text
domain/

├── aggregates/
├── entities/
├── value-objects/
├── enums/
├── events/
├── repositories/
├── services/
├── specifications/
└── exceptions/
```

Responsibilities:

- Business rules
- Domain entities
- Repository interfaces
- Domain events

The domain layer has no dependency on NestJS or Prisma.

---

# 13. Infrastructure Layer

```text
infrastructure/

├── prisma/
├── persistence/
├── cache/
├── messaging/
├── storage/
├── mail/
├── repositories/
└── adapters/
```

Responsibilities:

- Prisma repositories
- Redis
- RabbitMQ
- S3
- External APIs

---

# 14. shared/

Shared technical components.

```text
shared/

├── auth/
├── cache/
├── constants/
├── decorators/
├── errors/
├── events/
├── filters/
├── guards/
├── interceptors/
├── logger/
├── pagination/
├── pipes/
├── utils/
└── validation/
```

Shared code must not contain business logic.

---

# 15. infrastructure/

Application-wide infrastructure.

```text
infrastructure/

├── database/
├── prisma/
├── cache/
├── queue/
├── storage/
├── mail/
├── monitoring/
└── telemetry/
```

---

# 16. prisma/

```text
prisma/

├── schema.prisma
├── migrations/
├── seed/
└── generators/
```

---

# 17. packages/

Reusable libraries.

```text
packages/

├── sdk/
├── shared-types/
├── eslint-config/
├── tsconfig/
└── ui-contracts/
```

Useful if the frontend and backend share types.

---

# 18. docs/

Architecture and design documentation.

```text
docs/

├── architecture/
├── business/
├── database/
├── api/
├── deployment/
└── decisions/
```

---

# 19. infrastructure/

Deployment resources.

```text
infrastructure/

├── docker/
├── kubernetes/
├── terraform/
├── nginx/
└── monitoring/
```

---

# 20. docker/

```text
docker/

├── postgres/
├── redis/
├── rabbitmq/
├── minio/
├── mailpit/
└── nginx/
```

---

# 21. scripts/

Automation.

```text
scripts/

├── seed.ts
├── reset-db.ts
├── create-admin.ts
├── generate-openapi.ts
└── backup-db.sh
```

---

# 22. tests/

```text
tests/

├── unit/
├── integration/
├── e2e/
├── fixtures/
└── factories/
```

---

# 23. GitHub

```text
.github/

├── workflows/
│
├── ci.yml
├── test.yml
├── docker.yml
└── release.yml
```

---

# 24. Coding Standards

- Feature-first organization.
- One bounded context per module.
- Business logic stays in the Domain layer.
- Infrastructure depends on Domain, never the reverse.
- Shared code contains only technical utilities.
- Avoid circular dependencies between modules.
- Prefer constructor injection for dependencies.
- Expose only public APIs from each module.

---

# 25. Module Dependencies

```text
Presentation
      │
      ▼
Application
      │
      ▼
Domain
      ▲
      │
Infrastructure
```

Rules:

- Presentation → Application
- Application → Domain
- Infrastructure → Domain
- Domain → No external framework dependencies

---

# 26. Migration to Microservices

Each module is designed to become an independent service.

Example:

```text
modules/orders
        │
        ▼
Order Service

modules/catalog
        │
        ▼
Catalog Service

modules/payments
        │
        ▼
Payment Service
```

Because boundaries are respected from the beginning, extraction requires minimal code changes.

---

# 27. Repository Principles

- Modular by business capability.
- Keep modules loosely coupled.
- Favor composition over inheritance.
- Treat the Domain layer as framework-independent.
- Infrastructure is replaceable.
- Design APIs between modules as if they were future service boundaries.
- Documentation evolves alongside the code.

---

# 28. Future Growth

This structure supports:

- Modular Monolith (current)
- Event-Driven Architecture
- CQRS
- Independent microservices
- Multiple frontend applications
- Mobile clients
- Public API
- Third-party integrations
