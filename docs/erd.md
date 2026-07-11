# Project Atlas - Entity Relationship Diagram (ERD)

Version: 1.0

---

# 1. Purpose

This document defines the conceptual and logical data model for Project Atlas.

The ERD is organized by bounded context to improve readability and maintainability.

Each bounded context owns its own entities and relationships.

The diagrams are implementation-independent but are designed for PostgreSQL.

---

# 2. ERD Organization

| Section | Description |
|----------|-------------|
| Overview | High-level platform relationships |
| Identity | Authentication and authorization |
| Users | User profiles |
| Catalog | Products and metadata |
| Store | Cart and wishlist |
| Orders | Purchasing |
| Payments | Financial transactions |
| Licensing | Digital ownership |
| Library | Owned products |
| Community | Reviews and friends |
| Publisher | Product management |
| Notifications | User notifications |
| Administration | Audit and moderation |
| Analytics | Reporting |

---

# 3. Platform Overview

```mermaid
erDiagram

User ||--|| Library : owns

User ||--o{ Order : places

User ||--o{ Review : writes

User ||--o{ WishlistItem : saves

Publisher ||--o{ Product : publishes

Product ||--o{ ProductPrice : has

Product ||--o{ ProductBuild : contains

Product ||--o{ Review : receives

Order ||--|{ OrderItem : contains

Order ||--|| Payment : paid_by

Order ||--o{ License : generates

License }o--|| Product : grants_access

Library ||--o{ License : contains

Product }o--o{ Category : categorized

Product }o--o{ Tag : tagged
```

---

# 4. Identity Context

Entities

- UserCredential
- Session
- RefreshToken
- Role
- Permission
- UserRole
- RolePermission

```mermaid
erDiagram

UserCredential ||--o{ Session : has

UserCredential ||--o{ RefreshToken : owns

Role ||--o{ UserRole : assigned

Permission ||--o{ RolePermission : granted

Role ||--o{ RolePermission : contains
```

---

# 5. User Context

Entities

- User
- UserProfile
- UserPreference
- Avatar

```mermaid
erDiagram

User ||--|| UserProfile : owns

User ||--|| UserPreference : has

User ||--o| Avatar : uses
```

---

# 6. Catalog Context

Entities

- Product
- Publisher
- ProductPrice
- Category
- Tag
- ProductCategory
- ProductTag
- ProductBuild
- MediaAsset
- ProductLanguage
- SystemRequirement

```mermaid
erDiagram

Publisher ||--o{ Product : owns

Product ||--o{ ProductPrice : has

Product ||--o{ ProductBuild : has

Product ||--o{ MediaAsset : contains

Product ||--o{ ProductLanguage : supports

Product ||--o{ SystemRequirement : requires

Product }o--o{ Category : categorized

Product }o--o{ Tag : tagged
```

---

# 7. Store Context

Entities

- Cart
- CartItem
- Wishlist
- WishlistItem

```mermaid
erDiagram

User ||--|| Cart : owns

Cart ||--o{ CartItem : contains

User ||--|| Wishlist : owns

Wishlist ||--o{ WishlistItem : contains

Product ||--o{ CartItem : selected

Product ||--o{ WishlistItem : saved
```

---

# 8. Orders Context

Entities

- Order
- OrderItem
- Invoice

```mermaid
erDiagram

User ||--o{ Order : places

Order ||--|{ OrderItem : contains

Order ||--|| Invoice : generates
```

---

# 9. Payments Context

Entities

- Payment
- PaymentMethod
- Refund
- Transaction

```mermaid
erDiagram

Order ||--|| Payment : paid_by

Payment ||--o{ Refund : has

Payment ||--o{ Transaction : records
```

---

# 10. Licensing Context

Entities

- License

```mermaid
erDiagram

Order ||--o{ License : generates

License }o--|| Product : references

License }o--|| User : owned_by
```

---

# 11. Library Context

Entities

- Library
- LibraryItem
- Installation
- DownloadHistory

```mermaid
erDiagram

User ||--|| Library : owns

Library ||--o{ LibraryItem : contains

LibraryItem ||--o{ Installation : records

LibraryItem ||--o{ DownloadHistory : tracks
```

---

# 12. Community Context

Entities

- Review
- Friend
- FriendRequest

```mermaid
erDiagram

User ||--o{ Review : writes

Product ||--o{ Review : receives

User ||--o{ FriendRequest : sends

User ||--o{ Friend : has
```

---

# 13. Publisher Context

Entities

- Publisher
- PublisherMember
- ProductSubmission
- ReleaseSchedule

```mermaid
erDiagram

Publisher ||--o{ PublisherMember : employs

Publisher ||--o{ ProductSubmission : creates

Product ||--o{ ReleaseSchedule : schedules
```

---

# 14. Notification Context

Entities

- Notification
- NotificationTemplate
- NotificationDelivery

```mermaid
erDiagram

User ||--o{ Notification : receives

Notification ||--o{ NotificationDelivery : delivered_as

NotificationTemplate ||--o{ Notification : formats
```

---

# 15. Administration Context

Entities

- AuditLog
- ModerationCase
- ModerationAction

```mermaid
erDiagram

AuditLog

ModerationCase ||--o{ ModerationAction : contains
```

---

# 16. Analytics Context

Entities

- SalesSnapshot
- ProductStatistics
- RevenueSummary

Analytics data is derived from operational data and should not be the source of truth.

---

# 17. Relationship Rules

- One User owns one Library.
- One Publisher owns many Products.
- One Product has many Builds.
- One Order contains many Order Items.
- One Payment belongs to one Order.
- One License belongs to one User and one Product.
- One User may write one Review per Product.
- Products may belong to many Categories and Tags.
- A Cart belongs to exactly one User.
- A Wishlist belongs to exactly one User.

---

# 18. Next Step

This ERD defines conceptual relationships.

The following document (`database-schema.md`) will define:

- Tables
- Columns
- Data types
- Primary keys
- Foreign keys
- Constraints
- Indexes
- Partitioning
- Naming conventions
