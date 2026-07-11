# Project Atlas - Event Storming

Version: 1.0

---

# 1. Introduction

## Purpose

This document captures the business events, commands, actors, policies, aggregates, and external systems of Project Atlas.

The goal is to understand the business workflow independently of implementation details and identify the natural boundaries of the domain.

---

# 2. Event Storming Legend

| Element | Description |
|----------|-------------|
| Actor | A person or external system that initiates an action |
| Command | An intention to perform an operation |
| Aggregate | The business entity responsible for handling the command |
| Domain Event | Something important that has happened |
| Policy | A business rule reacting to one or more events |
| External System | A third-party system |

---

# 3. Actors

## Customer

- Registers
- Logs in
- Browses products
- Purchases products
- Downloads owned products
- Writes reviews
- Requests refunds

---

## Publisher

- Creates products
- Uploads builds
- Publishes releases
- Updates pricing

---

## Administrator

- Moderates products
- Suspends users
- Processes refunds
- Reviews audit logs

---

## Support Agent

- Handles customer requests
- Approves or rejects refunds

---

## External Systems

- Payment Gateway
- Email Provider
- CDN
- Object Storage

---

# 4. Core Aggregates

- User
- Product
- Cart
- Order
- Payment
- License
- Library
- Publisher
- Review
- Notification

---

# 5. Identity Events

## Command

Register User

↓

Aggregate

User

↓

Domain Event

User Registered

↓

Policy

Send Verification Email

↓

Domain Event

Verification Email Sent

---

## Command

Verify Email

↓

Aggregate

User

↓

Domain Event

Email Verified

---

## Command

Login

↓

Aggregate

User

↓

Domain Event

User Logged In

---

## Command

Logout

↓

Aggregate

User

↓

Domain Event

User Logged Out

---

# 6. Product Publishing Flow

Actor

Publisher

↓

Command

Create Product

↓

Aggregate

Product

↓

Event

Product Created

↓

Command

Upload Build

↓

Aggregate

Product

↓

Event

Build Uploaded

↓

Command

Submit Product

↓

Aggregate

Product

↓

Event

Product Submitted For Review

↓

Actor

Administrator

↓

Command

Approve Product

↓

Aggregate

Product

↓

Event

Product Approved

↓

Policy

Publish Product

↓

Event

Product Published

---

# 7. Shopping Flow

Actor

Customer

↓

Command

Add Product To Cart

↓

Aggregate

Cart

↓

Event

Product Added To Cart

↓

Command

Remove Product From Cart

↓

Aggregate

Cart

↓

Event

Product Removed From Cart

---

# 8. Checkout Flow

Actor

Customer

↓

Command

Checkout

↓

Aggregate

Order

↓

Event

Checkout Started

↓

Policy

Calculate Order Total

↓

Event

Order Total Calculated

↓

Policy

Request Payment

↓

External System

Payment Gateway

↓

Event

Payment Requested

↓

Payment Gateway

↓

Event

Payment Authorized

↓

Aggregate

Payment

↓

Event

Payment Completed

↓

Policy

Create Order

↓

Event

Order Created

↓

Policy

Generate License

↓

Event

License Generated

↓

Policy

Update Library

↓

Event

Product Added To Library

↓

Policy

Send Purchase Confirmation

↓

Event

Purchase Confirmation Sent

---

# 9. Refund Flow

Actor

Customer

↓

Command

Request Refund

↓

Aggregate

Payment

↓

Event

Refund Requested

↓

Actor

Support Agent

↓

Command

Approve Refund

↓

Aggregate

Payment

↓

Event

Refund Approved

↓

Policy

Refund Payment

↓

Event

Payment Refunded

↓

Policy

Revoke License

↓

Event

License Revoked

---

# 10. Download Flow

Actor

Customer

↓

Command

Download Product

↓

Aggregate

License

↓

Event

Ownership Verified

↓

Policy

Generate Download Token

↓

Event

Download Authorized

↓

External System

CDN

↓

Event

Download Started

↓

Event

Download Completed

---

# 11. Review Flow

Actor

Customer

↓

Command

Submit Review

↓

Aggregate

Review

↓

Event

Review Submitted

↓

Policy

Recalculate Rating

↓

Event

Product Rating Updated

---

# 12. Notification Flow

Events That Trigger Notifications

- User Registered
- Email Verified
- Payment Completed
- Order Created
- Refund Approved
- Product Published
- Friend Request Received
- Review Moderated

---

# 13. Administration Flow

Administrator

↓

Command

Suspend User

↓

Aggregate

User

↓

Event

User Suspended

↓

Policy

Invalidate Sessions

↓

Event

Sessions Revoked

---

Administrator

↓

Command

Approve Product

↓

Aggregate

Product

↓

Event

Product Approved

---

Administrator

↓

Command

Reject Product

↓

Aggregate

Product

↓

Event

Product Rejected

---

# 14. Publisher Flow

Publisher

↓

Command

Update Price

↓

Aggregate

Product

↓

Event

Price Updated

---

Publisher

↓

Command

Upload New Build

↓

Aggregate

Build

↓

Event

Build Uploaded

---

Publisher

↓

Command

Schedule Release

↓

Aggregate

Product

↓

Event

Release Scheduled

↓

Policy

Automatic Publication

↓

Event

Product Published

---

# 15. Cross-Context Events

| Event | Produced By | Consumed By |
|--------|-------------|-------------|
| User Registered | Identity | Notification |
| Email Verified | Identity | User |
| Product Published | Catalog | Store |
| Payment Completed | Payments | Orders |
| Order Created | Orders | Licensing |
| License Generated | Licensing | Library |
| Product Added To Library | Library | Downloads |
| Review Submitted | Community | Catalog |
| Refund Approved | Payments | Licensing |
| User Suspended | Administration | Identity |

---

# 16. Event Categories

## Identity

- User Registered
- Email Verified
- User Logged In
- User Logged Out
- Password Changed

---

## Catalog

- Product Created
- Product Updated
- Product Published
- Price Updated
- Build Uploaded

---

## Store

- Product Added To Cart
- Product Removed From Cart
- Wishlist Updated

---

## Orders

- Checkout Started
- Order Created
- Order Completed

---

## Payments

- Payment Requested
- Payment Authorized
- Payment Completed
- Payment Failed
- Refund Requested
- Refund Approved
- Payment Refunded

---

## Licensing

- License Generated
- License Revoked

---

## Library

- Product Added To Library

---

## Downloads

- Download Authorized
- Download Started
- Download Completed

---

## Community

- Review Submitted
- Rating Updated
- Friend Request Sent

---

## Administration

- User Suspended
- Product Approved
- Product Rejected

---

# 17. Event Priorities

## Critical

- Payment Completed
- Order Created
- License Generated
- Ownership Verified

---

## High

- Product Published
- Refund Approved
- User Registered

---

## Medium

- Review Submitted
- Download Completed
- Price Updated

---

## Low

- Friend Request Sent
- Wishlist Updated

---

# 18. Future Event-Driven Architecture

These events are designed to become asynchronous messages when the platform evolves into a distributed system.

Potential message broker technologies include:

- RabbitMQ
- Apache Kafka
- NATS

Examples of future event consumers:

- Notification Service
- Analytics Service
- Recommendation Service
- Audit Service
- Search Indexing Service

The event names defined in this document should remain stable over time, allowing independent services to communicate without tight coupling.
