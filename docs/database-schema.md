# Project Atlas - Database Schema

Version: 1.0

---

# 1. Purpose

This document defines the logical database schema for Project Atlas.

The platform uses **PostgreSQL** as the primary transactional database.

The schema is organized by bounded context to improve maintainability and to align with the Domain-Driven Design architecture.

---

# 2. Database Overview

## Database Engine

PostgreSQL

---

## ORM

Prisma ORM

---

## ID Strategy

UUID v7 (preferred)

Fallback

UUID v4

---

## Character Encoding

UTF-8

---

## Timezone

UTC

---

## Soft Deletes

Supported using

```
deleted_at
```

---

## Auditing

Most tables contain

```
created_at

updated_at

created_by

updated_by
```

---

# 3. Common Columns

Every business table should contain:

| Column | Type | Notes |
|----------|---------|----------------|
| id | UUID | Primary Key |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update |
| deleted_at | TIMESTAMP NULL | Soft delete |

---

# 4. Identity Schema

## users_credentials

| Column | Type |
|----------|---------|
| id | UUID |
| email | VARCHAR(255) |
| password_hash | TEXT |
| email_verified | BOOLEAN |
| last_login | TIMESTAMP |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## sessions

| Column | Type |
|----------|---------|
| id | UUID |
| user_id | UUID FK |
| refresh_token | TEXT |
| expires_at | TIMESTAMP |
| ip_address | INET |
| user_agent | TEXT |

---

## roles

| Column | Type |
|----------|---------|
| id | UUID |
| name | VARCHAR |

---

## permissions

| Column | Type |
|----------|---------|
| id | UUID |
| code | VARCHAR |
| description | TEXT |

---

## role_permissions

Many-to-many

Role ↔ Permission

---

## user_roles

Many-to-many

User ↔ Role

---

# 5. User Schema

## users

| Column | Type |
|----------|---------|
| id | UUID |
| username | VARCHAR |
| display_name | VARCHAR |
| avatar_url | TEXT |
| country | VARCHAR |
| language | VARCHAR |
| status | VARCHAR |

---

## user_preferences

Stores

- Theme
- Language
- Currency
- Notifications

---

# 6. Catalog Schema

## publishers

Stores publisher information.

---

## products

Stores product metadata.

Columns include:

- id
- publisher_id
- slug
- title
- description
- release_date
- product_type
- visibility
- status

---

## product_prices

Stores

- Currency
- Region
- Price
- Discount

---

## categories

Master table.

---

## tags

Master table.

---

## product_categories

Many-to-many

---

## product_tags

Many-to-many

---

## media_assets

Stores

- screenshots
- trailers
- cover images

---

## product_builds

Stores downloadable builds.

---

## supported_languages

Stores language support.

---

## system_requirements

Stores

- minimum
- recommended

---

# 7. Store Schema

## carts

One cart per customer.

---

## cart_items

Products inside cart.

---

## wishlists

One wishlist per customer.

---

## wishlist_items

Saved products.

---

# 8. Orders Schema

## orders

Stores

- customer
- total
- currency
- status

---

## order_items

Stores

- product
- purchase_price
- quantity

---

## invoices

Generated after payment.

---

# 9. Payments Schema

## payments

Stores

- gateway
- amount
- status
- transaction reference

---

## refunds

Stores

- amount
- reason
- status

---

## payment_transactions

Stores gateway communication history.

---

# 10. Licensing Schema

## licenses

Represents digital ownership.

Fields

- owner
- product
- order
- status

---

# 11. Library Schema

## libraries

One per user.

---

## library_items

Owned products.

---

## installations

Installation history.

---

## download_history

Download records.

---

# 12. Community Schema

## reviews

Stores ratings and reviews.

---

## friends

Friend relationships.

---

## friend_requests

Pending requests.

---

# 13. Publisher Schema

## publisher_members

Publisher staff.

---

## product_submissions

Submission workflow.

---

## release_schedule

Future releases.

---

# 14. Notification Schema

## notifications

User notifications.

---

## notification_templates

Reusable templates.

---

## notification_delivery

Delivery status.

---

# 15. Administration Schema

## audit_logs

Immutable audit trail.

---

## moderation_cases

Moderation workflow.

---

## moderation_actions

Actions taken.

---

# 16. Analytics Schema

Read-model tables

Examples

- sales_daily
- revenue_monthly
- product_statistics

---

# 17. Relationships

```
User

├── Orders

├── Library

├── Wishlist

├── Reviews

└── Notifications

Publisher

└── Products

Product

├── Prices

├── Builds

├── Categories

├── Tags

├── Reviews

└── Licenses

Order

├── OrderItems

├── Payment

└── License

Library

└── LibraryItems
```

---

# 18. Constraints

- Email must be unique.
- Product slug must be unique.
- One review per user per product.
- One wishlist per user.
- One library per user.
- Orders cannot exist without users.
- Licenses require completed payments.

---

# 19. Index Strategy

Indexes should exist on

- email
- username
- slug
- product_id
- publisher_id
- order_id
- user_id
- created_at

Composite indexes should be added based on query patterns.

---

# 20. Future Evolution

The schema is designed to support:

- Horizontal scaling
- Read replicas
- CQRS read models
- Event sourcing (optional)
- Multi-region deployment
- Service decomposition

Future microservices will own only the tables belonging to their bounded context.
