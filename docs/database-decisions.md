# Project Atlas - Database Design Decisions

Version: 1.0

Status: Approved

---

# 1. Purpose

This document records the architectural decisions related to the database design of Project Atlas.

Every important database decision should be documented here before implementation.

This document acts as the source of truth for future schema changes.

---

# 2. Database Engine

## Decision

Use **PostgreSQL** as the primary transactional database.

## Reason

- Mature ecosystem
- Excellent SQL support
- ACID compliance
- Strong indexing capabilities
- JSONB support
- Full-text search
- Horizontal scaling through read replicas
- Compatible with Prisma ORM

---

# 3. ORM

## Decision

Use **Prisma ORM**.

## Reason

- Excellent TypeScript support
- Type-safe queries
- Easy migrations
- Good developer experience
- Strong NestJS integration

---

# 4. Identifier Strategy

## Decision

Use **UUID v7** as the primary key for all business entities.

Fallback: UUID v4 if UUID v7 is unavailable.

## Reason

- Globally unique
- Safe for distributed systems
- Prevents ID enumeration
- Better insertion locality than UUID v4
- Easier future service decomposition

---

# 5. Naming Convention

## Tables

Plural, snake_case.

Examples

```
users
products
orders
payment_transactions
```

---

## Columns

snake_case.

Examples

```
created_at
updated_at
publisher_id
password_hash
```

---

## Foreign Keys

```
<entity>_id
```

Examples

```
user_id
order_id
product_id
license_id
```

---

## Junction Tables

Alphabetical order.

Examples

```
product_categories
product_tags
user_roles
role_permissions
```

---

# 6. Timestamp Strategy

## Decision

Use **TIMESTAMPTZ** (timestamp with time zone).

Store all timestamps in UTC.

## Standard Columns

```
created_at

updated_at

deleted_at
```

## Reason

Avoid timezone-related bugs.

---

# 7. Soft Deletes

## Decision

Use soft deletes for business entities.

```
deleted_at TIMESTAMPTZ NULL
```

## Reason

- Auditability
- Restore capability
- Preserve historical references
- Regulatory compliance

Never hard-delete transactional data unless legally required.

---

# 8. Audit Columns

Business tables should include:

```
created_by

updated_by
```

where applicable.

Audit logs are stored separately.

---

# 9. Money Representation

## Decision

Store monetary values as **integer minor units**.

Examples

```
1999 = $19.99

499 = €4.99
```

## Reason

Avoid floating-point precision errors.

---

# 10. Currency

Use ISO-4217 currency codes.

Examples

```
USD

EUR

GBP

DZD
```

---

# 11. Regional Pricing

Prices are stored separately from products.

```
products

product_prices
```

Reason

- Multi-currency
- Regional pricing
- Discounts
- Future tax rules

---

# 12. Product Metadata

Structured data belongs in relational tables.

Flexible metadata uses JSONB only when appropriate.

Example

Good JSONB usage

```
launcher_metadata
graphics_settings
```

Avoid storing core business data in JSONB.

---

# 13. Full-Text Search

Use PostgreSQL Full-Text Search initially.

Future

ElasticSearch / OpenSearch.

Reason

Avoid unnecessary infrastructure early.

---

# 14. Indexing Strategy

Create indexes for:

- Foreign Keys
- Email
- Username
- Product Slug
- Product Status
- Release Date
- Created At

Composite indexes should reflect actual query patterns.

---

# 15. Cascading Rules

Never cascade delete business entities.

Preferred behavior

```
RESTRICT

or

SET NULL
```

Reason

Prevent accidental data loss.

---

# 16. Transactions

Use PostgreSQL transactions for:

- Checkout
- Payment
- Refund
- License generation

Reason

Maintain consistency.

---

# 17. Concurrency

Use optimistic concurrency where applicable.

Version columns may be introduced for high-contention entities.

---

# 18. File Storage

Large binary files are **not stored in PostgreSQL**.

Store only:

```
URL

Bucket

Checksum

File Size

Content Type
```

Actual files reside in object storage.

---

# 19. Password Storage

Never store passwords.

Store

```
password_hash
```

using Argon2id.

---

# 20. Secrets

Secrets are never stored in the database.

Examples

JWT secrets

API keys

OAuth credentials

These belong in environment variables or a secrets manager.

---

# 21. UUID Exposure

UUIDs may be exposed through public APIs.

Auto-increment integers must never be exposed externally.

---

# 22. Multi-Language Support

Localized content is stored separately.

Example

```
product_translations

category_translations
```

Avoid duplicating localized columns in the main table.

---

# 23. Multi-Tenancy

Not required in Version 1.

Future support should be possible without redesign.

---

# 24. Event Storage

Business events are published through the application layer.

Future versions may implement an Outbox table.

---

# 25. Read Models

Analytics tables are read-only.

They are derived from operational data.

Never update operational tables from analytics.

---

# 26. Backups

Daily backups.

Point-in-time recovery enabled.

Backup retention policy:

- Daily: 30 days
- Weekly: 12 weeks
- Monthly: 12 months

---

# 27. Migration Strategy

Use Prisma Migrate.

Rules

- Never modify an applied migration.
- Create new migrations only.
- Review generated SQL before deployment.

---

# 28. Testing

Every migration must be tested on a staging database before production.

---

# 29. Performance Targets

- Indexed lookups: < 20 ms
- Typical queries: < 100 ms
- Complex reports: < 2 s

---

# 30. Future Evolution

The schema is designed to support:

- Read replicas
- CQRS
- Event-driven architecture
- Distributed services
- Database sharding (if required)
- Partitioning of high-volume tables
- Independent service databases in future microservices

---

# 31. Decision Log

| ID | Decision | Status |
|----|----------|--------|
| DB-001 | PostgreSQL | Approved |
| DB-002 | Prisma ORM | Approved |
| DB-003 | UUID v7 IDs | Approved |
| DB-004 | TIMESTAMPTZ | Approved |
| DB-005 | Soft Deletes | Approved |
| DB-006 | Integer Money | Approved |
| DB-007 | PostgreSQL FTS | Approved |
| DB-008 | Object Storage for Files | Approved |
| DB-009 | Argon2id Password Hashing | Approved |
| DB-010 | Prisma Migrations | Approved |
