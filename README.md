# Boarder-Q — Boarding House Management System

> A full-stack web application for managing boarding house operations — from room listings and tenant applications to payments, maintenance requests, and announcements.

---

## Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Cloud Services](#-cloud-services)
- [Deployment](#-deployment)

---

## Overview

**Boarder-Q** is a boarding house management platform built with **Next.js 14 (App Router)**. It provides separate dashboards for **admins (landlords)** and **tenants**, enabling end-to-end management of rooms, applications, payments, and maintenance — all in one place.

---

## Features

### Authentication & Access Control
- Secure login and registration with **JWT-based sessions**
- **Role-Based Access Control (RBAC)** — Admin and Tenant roles
- Password hashing and protected API routes

### Admin Dashboard
- Manage room listings (add, edit, update status)
- Review and approve/reject tenant applications
- Monitor payments and verify proof of payment
- Track active tenants and room occupancy in real time
- Post announcements visible to all tenants
- Manage maintenance requests

### Tenant Dashboard
- Upload payment proofs (GCash / Cash)
- Submit and track maintenance requests
- View announcements from the landlord

### Public Pages
- Browse available rooms without logging in
- View room details, amenities, and house rules
- Register and apply for a room

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14+ (App Router) |
| **UI Library** | React.js |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Next.js API Routes (Node.js) |
| **Database** | MySQL via Railway (mysql2/promise) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Image Storage** | Cloudinary API |
| **Deployment** | Vercel (Frontend) + Railway (Database) |

---

##  Project Structure

```
app/
├── layout.js
├── page.js
├── globals.css
│
├── admin/                    # Admin / Landlord dashboard
│   ├── layout.js
│   ├── dashboard/
│   ├── rooms/
│   ├── applications/
│   ├── announcements/
│   ├── payments/
│   ├── active-list/
│   ├── tenants/
│   └── maintenance/
│
├── public/                   # Public / unauthenticated pages
│   ├── rooms/
│   │   ├── page.js
│   │   └── [id]/
│   ├── login/
│   ├── register/
│   └── about/
│
├── tenant/                   # Tenant dashboard
│   ├── layout.js
│   ├── dashboard/
│   ├── payments/
│   ├── maintenance/
│   └── announcements/
│
├── api/                      # API routes
│   ├── admin/
│   │   ├── active-list/route.js
│   │   ├── applications/route.js
│   │   ├── dashboard/route.js
│   │   ├── payments/route.js
│   │   └── users/route.js
│   ├── announcements/route.js
│   ├── rooms/
│   │   ├── [id]/route.js
│   │   ├── upload/route.js
│   │   └── route.js
│   ├── auth/
│   │   ├── approve-user/route.js
│   │   ├── hash/route.js
│   │   ├── login/route.js
│   │   ├── me/route.js
│   │   └── register/route.js
│   ├── payments/
│   │   ├── history/route.js
│   │   └── route.js
│   ├── tenant/
│   │   ├── dashboard/route.js
│   │   └── notice/route.js
│   ├── users/
│   │   ├── profile/route.js
│   │   └── avatar/route.js
│   ├── notifications/route.js
│   └── maintenance/route.js
│
├── components/
│   ├── HelpSupport.js
│   ├── Navbar.js
│   ├── Sidebar.js
│   ├── Button.js
│   ├── Card.js
│   ├── RoomCard.js
│   ├── PaymentCard.js
│   ├── MaintenanceCard.js
│   ├── ProfileSettingsModal.js
│   ├── TenantFooter.js
│   ├── AdminFooter.js
│   ├── ThemeProvider.js
│   └── ApplicationCard.js
│
├── context/
│   ├── AuthContext.js
│   ├── HelpContext.js
│   ├── SidebarContext.js
│   └── ThemeContext.js
│
├── lib/
│   ├── db.js
│   └── auth.js
│
└── utils/
    └── helpers.js
```

---

## 🗄 Database Schema

Boarder-Q uses a **relational MySQL database** with the following tables:

### `rooms`
Stores room listings with capacity, pricing, status, and images.

### `users`
Stores admin and tenant accounts with role-based access and status management.

### `room_tenants`
The **source of truth for occupancy** — tracks which tenant occupies which room and for what period. Occupancy is computed in real time from this table.

### `applications`
Manages rental applications submitted by prospective tenants, including approval/rejection workflow.

### `payments`
Records all payment transactions (GCash/Cash) with proof-of-payment URLs, verification status, and month coverage.

### `maintenance_requests`
Tracks tenant-submitted maintenance issues from submission through resolution.

### `announcements`
Admin-authored notices broadcast to all tenants.

> **Key Design Principles:** Foreign key constraints for referential integrity, ACID-compliant SQL transactions, and computed occupancy algorithms based on live `room_tenants` records.

---

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL database (local or Railway)
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/boarder-q.git
   cd boarder-q
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Cloud Services

| Service | Purpose |
|---|---|
| **Cloudinary** | Hosts room images and payment proof screenshots with fast CDN delivery |
| **Railway** | Hosts the MySQL database with persistent, always-on cloud storage |

---

## Deployment

Boarder-Q is **live and deployed** on Vercel with the database hosted on Railway.

**[https://boarderq.vercel.app/]**

| Service | Platform | Status |
|---|---|---|
| **Frontend** | Vercel |  Live |
| **Database** | Railway (MySQL) |  Live |
| **Image Storage** | Cloudinary |  Live |

### Running Locally

If you want to run a local copy, clone the repo, set up your `.env`, and run:

```bash
npm install
npm run dev
```

---

## Contributors

Abal, Che Ann P.
Full-Stack Developer

Lagpac, Sheila Mae A.
UI/UX & Database Designer

Orosca, Xhyndy Lynne A.
Lead Systems Architect

##  License

This project is for educational purposes.
