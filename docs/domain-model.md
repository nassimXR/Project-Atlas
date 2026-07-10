# Project Atlas - Domain Model

Version: 1.0

---

# 1. Introduction

## Purpose

This document defines the core business concepts (Domain Model) of Project Atlas.

The Domain Model represents the business independently of any programming language, framework, database, or architectural style.

It serves as the foundation for database design, API design, service boundaries, and application implementation.

---

# 2. Domain Overview

Project Atlas is composed of several business domains:

- Identity
- User Management
- Product Catalog
- Store
- Orders
- Payments
- Digital Licensing
- Library
- Downloads
- Community
- Publisher Portal
- Notifications
- Administration
- Analytics

Each domain contains one or more business entities.

---

# 3. Core Domain Entities

## User

### Description

Represents a person using the platform.

### Responsibilities

- Authenticate
- Purchase products
- Own digital licenses
- Manage profile
- Manage wishlist
- Submit reviews
- Manage friends

### Relationships

- Has many Orders
- Has many Licenses
- Has one Library
- Has many Reviews
- Has many Notifications
- May have multiple Roles

### Business Rules

- Email must be unique.
- Account must be verified before purchases.
- Suspended users cannot authenticate.

---

## Role

### Description

Represents a collection of permissions assigned to users.

### Responsibilities

- Grant access to platform features.
- Define authorization policies.

### Relationships

- Assigned to many Users.
- Contains many Permissions.

---

## Permission

### Description

Represents an action that may be performed.

Examples

- Create Product
- Publish Product
- Approve Refund
- Manage Users

---

## Publisher

### Description

Represents an organization or individual that publishes digital products.

### Responsibilities

- Create products
- Upload builds
- Configure pricing
- Publish releases
- View sales analytics

### Relationships

- Owns many Products

---

## Product

### Description

Represents a digital item available in the marketplace.

### Product Types

- Game
- DLC
- Bundle
- Demo
- Soundtrack

### Responsibilities

- Store metadata
- Define pricing
- Track releases
- Support downloads

### Relationships

- Belongs to one Publisher
- Has many Prices
- Has many Builds
- Has many Reviews
- Has many Categories
- Has many Tags

### Business Rules

- Must be approved before publication.
- Must contain required metadata.

---

## Category

Groups similar products.

Examples

- Action
- RPG
- Strategy
- Simulation

---

## Tag

Represents searchable characteristics.

Examples

- Multiplayer
- Single Player
- Horror
- Open World

---

## Price

Represents the selling price of a product.

Responsibilities

- Regional pricing
- Currency
- Discounts

---

## Cart

Represents products selected for purchase.

Responsibilities

- Store selected products
- Calculate totals
- Apply discounts

Business Rules

- Cannot contain already owned products.
- Cannot contain duplicate products.

---

## Order

Represents a completed purchase.

Responsibilities

- Record purchased products
- Record payment
- Generate licenses

Relationships

- Belongs to one User
- Contains many Order Items
- Has one Payment

Business Rules

- Immutable after completion.

---

## Order Item

Represents a purchased product inside an order.

Responsibilities

- Preserve purchase price
- Preserve quantity
- Preserve discount information

---

## Payment

Represents a financial transaction.

Responsibilities

- Verify payment
- Record payment result
- Support refunds

Business Rules

- Successful payment is required before ownership.

---

## Refund

Represents a refund request or completed refund.

Responsibilities

- Record refund reason
- Track status
- Link to payment

---

## License

Represents permanent digital ownership.

Responsibilities

- Verify ownership
- Authorize downloads

Relationships

- Belongs to one User
- References one Product
- Originates from one Order

Business Rules

- Created only after successful payment.

---

## Library

Represents the customer's digital collection.

Responsibilities

- Display owned products
- Track installation history
- Track download history

Relationships

- Belongs to one User
- Contains many Licenses

---

## Build

Represents a downloadable version of a product.

Responsibilities

- Version management
- File metadata
- Release history

Relationships

- Belongs to one Product

---

## Download

Represents a download request.

Responsibilities

- Verify ownership
- Generate temporary authorization
- Record download activity

---

## Review

Represents customer feedback.

Responsibilities

- Rating
- Written review
- Recommendation

Business Rules

- Only owners may submit reviews.
- One review per customer per product.

---

## Wishlist

Represents products saved for future purchase.

Responsibilities

- Save products
- Remove products
- Notify about discounts

---

## Notification

Represents a platform message.

Examples

- Purchase confirmation
- Refund status
- Friend request
- Publisher updates

---

## Audit Log

Represents an immutable record of important platform actions.

Responsibilities

- Security auditing
- Compliance
- Operational investigation

---

# 4. Value Objects

Value Objects describe concepts without independent identity.

Examples

- Email Address
- Password Hash
- Money
- Currency
- Address
- Language
- System Requirements
- Version Number
- Product Metadata

---

# 5. Aggregates

## User Aggregate

Root

- User

Contains

- Library
- Wishlist
- Notifications
- Sessions

---

## Catalog Aggregate

Root

- Product

Contains

- Price
- Build
- Media Assets
- Categories
- Tags

---

## Order Aggregate

Root

- Order

Contains

- Order Items
- Payment
- Refund

---

## Publisher Aggregate

Root

- Publisher

Contains

- Products
- Releases

---

# 6. Domain Services

Some business operations do not naturally belong to a single entity.

Examples

- Checkout Service
- Payment Processing Service
- License Generation Service
- Pricing Service
- Search Service
- Recommendation Service
- Notification Service
- Download Authorization Service

---

# 7. Domain Events

Important business events include:

- User Registered
- Email Verified
- User Logged In
- Product Created
- Product Published
- Price Updated
- Product Added to Cart
- Checkout Started
- Payment Authorized
- Payment Completed
- Order Created
- License Generated
- Product Added to Library
- Download Requested
- Download Authorized
- Review Submitted
- Refund Requested
- Refund Approved

These events become the foundation of future event-driven communication.

---

# 8. Bounded Contexts

The domain is divided into the following bounded contexts:

- Identity
- User Management
- Catalog
- Store
- Orders
- Payments
- Licensing
- Library
- Downloads
- Community
- Publisher
- Administration
- Notifications
- Analytics

Each context owns its own business rules and data.

---

# 9. Relationships (Conceptual)

User
├── owns → License
├── creates → Order
├── writes → Review
├── has → Library
├── has → Wishlist
└── receives → Notification

Publisher
└── publishes → Product

Product
├── has → Price
├── has → Build
├── has → Review
├── belongs to → Category
└── has → Tag

Order
├── contains → Order Item
├── generates → License
└── references → Payment

Library
└── contains → License

License
└── grants access to → Product

Download
└── requires → License

---

# 10. Future Domain Extensions

The model is designed to support future additions without major redesign.

Examples include:

- Marketplace
- Game Gifting
- Family Sharing
- Subscription Plans
- Cloud Gaming
- Workshop and Mods
- Achievements
- Trading Cards
- Creator Economy
- Multi-Region Distribution
