# Project Atlas - Use Cases (useCase.png)

## 1. Introduction

### Purpose

This document describes the primary interactions between actors and Project Atlas.

Each use case defines a business process that the platform must support.

---

# 2. Actors

| Actor | Description |
|--------|-------------|
| Guest | Visitor without an account |
| Customer | Registered user who purchases digital products |
| Publisher | Organization or individual that publishes products |
| Moderator | Reviews community content |
| Support Agent | Handles customer issues and refunds |
| Administrator | Manages the platform |
| External Payment Gateway | Processes payments |
| Email Service | Sends emails |
| Content Delivery Network (CDN) | Delivers downloadable files |

---

# 3. Customer Use Cases

## UC-001 Register Account

### Primary Actor

Guest

### Goal

Create a new customer account.

### Preconditions

- User is not authenticated.
- Email address is not already registered.

### Main Flow

1. User opens the registration page.
2. User enters account information.
3. Platform validates the input.
4. Platform creates the account.
5. Verification email is sent.
6. User verifies the email.
7. Account becomes active.

### Alternative Flows

- Email already exists.
- Invalid information.
- Verification link expired.

### Postconditions

- User account exists.
- Email is verified.

---

## UC-002 Login

### Primary Actor

Customer

### Goal

Authenticate into the platform.

### Preconditions

- Account exists.
- Account is active.

### Main Flow

1. User enters credentials.
2. Platform validates credentials.
3. Authentication succeeds.
4. Session is created.
5. Access token is issued.

### Alternative Flows

- Wrong password.
- Account suspended.
- MFA required.

### Postconditions

- User is authenticated.

---

## UC-003 Browse Store

### Primary Actor

Customer

### Goal

Browse available products.

### Main Flow

1. User opens store.
2. User searches or filters products.
3. Platform returns matching products.
4. User opens a product page.

### Postconditions

- Product details are displayed.

---

## UC-004 Add Product to Cart

### Primary Actor

Customer

### Goal

Add a product to the shopping cart.

### Preconditions

- Product exists.
- Product is available.

### Main Flow

1. Customer selects a product.
2. Customer clicks "Add to Cart".
3. Platform validates eligibility.
4. Product is added.

### Alternative Flows

- Product already owned.
- Product unavailable.

### Postconditions

- Cart contains the product.

---

## UC-005 Purchase Products

### Primary Actor

Customer

### Supporting Actors

Payment Gateway

### Goal

Purchase products.

### Preconditions

- Shopping cart is not empty.

### Main Flow

1. Customer reviews cart.
2. Customer proceeds to checkout.
3. Customer selects payment method.
4. Payment is processed.
5. Order is created.
6. Digital licenses are generated.
7. Products are added to library.
8. Confirmation email is sent.

### Alternative Flows

- Payment declined.
- Payment timeout.
- Fraud detected.

### Postconditions

- Order completed.
- Products owned.

---

## UC-006 Download Product

### Primary Actor

Customer

### Supporting Actor

CDN

### Preconditions

- Customer owns the product.

### Main Flow

1. Customer opens library.
2. Customer selects a game.
3. Platform verifies ownership.
4. Download authorization is generated.
5. Download begins.

### Alternative Flows

- Ownership invalid.
- Download unavailable.

### Postconditions

- Product download starts.

---

## UC-007 Submit Review

### Primary Actor

Customer

### Preconditions

- Product is owned.

### Main Flow

1. Customer opens product page.
2. Customer writes review.
3. Rating is selected.
4. Review is published.

### Alternative Flows

- Customer does not own product.
- Review violates guidelines.

### Postconditions

- Review becomes visible.

---

# 4. Publisher Use Cases

## UC-101 Create Product

Publisher creates a new digital product.

---

## UC-102 Upload Game Build

Publisher uploads a playable version.

---

## UC-103 Publish Product

Publisher submits a product for publication.

---

## UC-104 Manage Pricing

Publisher updates pricing, discounts, and regional prices.

---

## UC-105 View Analytics

Publisher reviews sales reports and product statistics.

---

# 5. Administrator Use Cases

## UC-201 Manage Users

Administrator manages user accounts.

Operations include:

- Suspend
- Ban
- Activate
- Reset password
- Assign roles

---

## UC-202 Moderate Products

Administrator reviews submitted products before publication.

---

## UC-203 Process Refund

Administrator or support agent reviews refund requests.

Possible outcomes:

- Approve
- Reject
- Request additional information

---

## UC-204 View Reports

Administrator views operational and business reports.

Examples:

- Revenue
- Active users
- Sales
- Refunds
- Top-selling products

---

# 6. Community Use Cases

## UC-301 Send Friend Request

Customer sends a friend request.

---

## UC-302 Accept Friend Request

Customer accepts a pending request.

---

## UC-303 Block User

Customer blocks another customer.

---

## UC-304 View Activity Feed

Customer views recent activities from friends.

---

# 7. Notification Use Cases

## UC-401 Receive Purchase Confirmation

Triggered after successful purchase.

---

## UC-402 Receive Refund Notification

Triggered after refund processing.

---

## UC-403 Receive Friend Request Notification

Triggered when another customer sends a request.

---

# 8. System Use Cases

## UC-501 Verify Ownership

Verify that a customer owns a product before allowing access.

---

## UC-502 Generate Digital License

Automatically create a license after successful payment.

---

## UC-503 Generate Download Token

Create a secure, time-limited token for downloading a product.

---

## UC-504 Record Audit Log

Record security-sensitive platform events.

---

# 9. Future Use Cases

- Gift Products
- Family Sharing
- Cloud Saves
- Marketplace
- Workshop
- Achievements
- Trading Cards
- Voice Chat
- Live Streaming
- Subscription Service
