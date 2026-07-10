# Project Atlas - User Stories

## 1. Introduction

### Purpose

This document describes the functional expectations of the platform from the perspective of its users.

Each story follows the format:

> As a `<role>`, I want `<goal>` so that `<benefit>`.

Each story also includes acceptance criteria that define when it is considered complete.

---

# 2. Customer Stories

---

## US-001 Create an Account

**Story**

As a Guest, I want to create an account so that I can purchase and manage digital games.

### Acceptance Criteria

- Registration form is available.
- Email must be unique.
- Password satisfies security requirements.
- Verification email is sent.
- Account is created successfully.

---

## US-002 Log In

As a Customer, I want to securely log into my account so that I can access my library.

### Acceptance Criteria

- Valid credentials authenticate the user.
- Invalid credentials return an error.
- Session is created.
- Authentication token is generated.

---

## US-003 Reset Password

As a Customer, I want to reset my password so that I can recover access to my account.

### Acceptance Criteria

- Password reset email is generated.
- Reset link expires.
- Password can be changed securely.

---

## US-004 Browse the Store

As a Customer, I want to browse available products so that I can discover games.

### Acceptance Criteria

- Products are listed.
- Products can be filtered.
- Products can be searched.
- Product details are accessible.

---

## US-005 Search Products

As a Customer, I want to search for products so that I can quickly find games.

### Acceptance Criteria

- Search returns matching products.
- Results support pagination.
- Search supports partial matches.

---

## US-006 Add Product to Wishlist

As a Customer, I want to save products to my wishlist so that I can purchase them later.

### Acceptance Criteria

- Products can be added.
- Products can be removed.
- Wishlist persists.

---

## US-007 Add Product to Cart

As a Customer, I want to place products into my cart so that I can purchase multiple products together.

### Acceptance Criteria

- Products are added.
- Duplicate products are prevented.
- Cart total updates automatically.

---

## US-008 Purchase Products

As a Customer, I want to purchase products so that I permanently own them.

### Acceptance Criteria

- Checkout succeeds.
- Payment is verified.
- Order is created.
- License is generated.
- Library is updated.

---

## US-009 View Library

As a Customer, I want to access my purchased products so that I can download them.

### Acceptance Criteria

- Owned products appear.
- Product information is displayed.
- Library loads successfully.

---

## US-010 Download a Product

As a Customer, I want to download owned products so that I can install them.

### Acceptance Criteria

- Ownership is verified.
- Download authorization is created.
- Download begins successfully.

---

## US-011 Submit a Review

As a Customer, I want to review purchased products so that I can share my experience.

### Acceptance Criteria

- Only owners may review.
- Rating is required.
- Review is saved.

---

## US-012 Manage Profile

As a Customer, I want to update my profile information so that my account remains current.

### Acceptance Criteria

- Profile information updates successfully.
- Avatar can be changed.
- Preferences are saved.

---

# 3. Publisher Stories

---

## US-101 Register as Publisher

As a Publisher, I want to create a publisher profile so that I can distribute digital products.

---

## US-102 Create Product

As a Publisher, I want to create a product page so that customers can discover my game.

---

## US-103 Upload Build

As a Publisher, I want to upload game builds so that customers can download them.

---

## US-104 Manage Product

As a Publisher, I want to update product information so that my store page stays accurate.

---

## US-105 Configure Pricing

As a Publisher, I want to define product prices so that customers can purchase my products.

---

## US-106 Schedule Releases

As a Publisher, I want to publish products at a future date so that launches occur automatically.

---

## US-107 View Sales Analytics

As a Publisher, I want to view sales reports so that I can evaluate product performance.

---

# 4. Administrator Stories

---

## US-201 Manage Users

As an Administrator, I want to manage user accounts so that the platform remains secure.

---

## US-202 Moderate Products

As an Administrator, I want to review submitted products so that only approved products are published.

---

## US-203 Process Refunds

As a Support Agent, I want to process refund requests so that customer issues are resolved.

---

## US-204 View Platform Reports

As an Administrator, I want to monitor platform activity so that I can make informed operational decisions.

---

## US-205 Configure Platform

As an Administrator, I want to manage platform settings so that the system operates correctly.

---

# 5. Community Stories

---

## US-301 Send Friend Request

As a Customer, I want to send friend requests so that I can connect with other players.

---

## US-302 Accept Friend Request

As a Customer, I want to accept friend requests so that I can build my friend list.

---

## US-303 Block User

As a Customer, I want to block abusive users so that I have a safer experience.

---

## US-304 Receive Notifications

As a Customer, I want to receive notifications so that I stay informed about important events.

---

## US-305 View Activity Feed

As a Customer, I want to view recent activities from friends so that I can stay connected.

---

# 6. System Stories

---

## US-401 Verify Ownership

As the Platform, I want to verify ownership before downloads so that only licensed users access products.

---

## US-402 Generate Digital License

As the Platform, I want to generate licenses after successful purchases so that ownership is recorded.

---

## US-403 Record Audit Logs

As the Platform, I want to record important events so that security and compliance are maintained.

---

## US-404 Send Emails

As the Platform, I want to automatically send emails so that users receive important information.

---

# 7. MVP Backlog

The following stories define the Minimum Viable Product.

### Authentication

- US-001
- US-002
- US-003

### Store

- US-004
- US-005
- US-006
- US-007

### Orders

- US-008

### Library

- US-009
- US-010

### Community

- US-011

### User

- US-012

### Publisher

- US-101
- US-102
- US-103
- US-104
- US-105

### Administration

- US-201
- US-202
- US-203

---

# 8. Future Stories

Future releases may include:

- Marketplace
- Trading
- Achievements
- Cloud Saves
- Workshop
- Live Streaming
- Family Sharing
- Game Subscriptions
- Creator Economy
- AI-powered Recommendations
