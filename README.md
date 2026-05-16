This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



You are a senior frontend developer.

Build a complete frontend UI for a system called "BoarderQueue".

Tech stack:
- Next.js (App Router)
- JavaScript (NOT TypeScript)
- Tailwind CSS

Do NOT include backend logic yet. Use mock/dummy data only.

----------------------------------

SYSTEM DESCRIPTION:

BoarderQueue is a boarding house management system with two roles:
1. Landlord (web dashboard)
2. Tenant (mobile-like UI but still web-based for now)

----------------------------------

REQUIRED PAGES:

PUBLIC PAGES:
1. Landing Page (/)
   - Title: BoarderQueue
   - Short description
   - "Browse Rooms" button
   - Clean modern UI

2. Rooms Page (/rooms)
   - Display list of rooms (cards)
   - Each card shows:
     - Room name
     - Price
     - Amenities
     - Status (Available/Occupied)
     - "Apply" button

3. Apply Page (/apply)
   - Form fields:
     - Full Name
     - Contact Number
     - Selected Room
     - Message (optional)
   - Submit button

----------------------------------

LANDLORD DASHBOARD:

4. Dashboard (/dashboard)
   - Summary cards:
     - Total Rooms
     - Occupied Rooms
     - Pending Applications
     - Active Maintenance Requests

5. Manage Rooms (/dashboard/rooms)
   - List of rooms
   - Add Room button
   - Edit/Delete buttons

6. Applications (/dashboard/applications)
   - List of applicants
   - Buttons:
     - Approve
     - Reject

7. Payments (/dashboard/payments)
   - Table of payments:
     - Tenant Name
     - Amount
     - Date
     - Status

8. Maintenance (/dashboard/maintenance)
   - List of requests
   - Status dropdown:
     - Received
     - In Progress
     - Resolved

----------------------------------

TENANT PAGES:

9. Tenant Dashboard (/tenant/dashboard)
   - Show:
     - Current Room
     - Rent Due Date
     - Latest Announcement

10. Tenant Payments (/tenant/payments)
   - Form:
     - Amount
     - Date
     - Reference Number
   - Payment history list

11. Tenant Maintenance (/tenant/maintenance)
   - Form:
     - Issue description
     - Upload image (UI only)
   - Request history

12. Announcements (/tenant/announcements)
   - List of announcements


--------------------------------------------------------
Final Full Folder Structure (Working Frontend and Backend)
--------------------------------------------------------
app/
├── layout.js               
├── page.js                
├── globals.css
│
├── admin/                   # Admin / Landlord dashboard
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
├── public/                  # Public / unauthenticated pages
│   ├── rooms/
│     ├── page.js
│     └── [id]/
│   ├── apply/
│   ├── login/
│   ├── register/
│   └── about/              
│
├── tenant/                  # Tenant dashboard
│   ├── layout.js            
│   ├── dashboard/
│   ├── payments/
│   ├── maintenance/
│   └── announcements/
│
├── api/                     # API routes
│   ├── admin/
│             ├── active-list/route.js (used by admin/active-list/page.js)
│             ├── applications/route.js (used by admin/applications/page.js)
│             ├── dashboard/route.js (used by admin/dashboard/page.js)
│             ├── payments/route.js (used by admin/payments/page.js)
│             └── users/route.js (used by admin/tenants/page.js)
│   ├── announcements/ (used by admin/annoucements/page.js, admin/dashboard/page.js, tenant/announcements/page.js)
│   ├── rooms/
│             ├── [id]/route.js  (used by public/rooms/[id]/page.js)
│             ├── upload/route.js (used by tenant/payments/page.js)
│             └── route.js (used by admin/dashboard/page.js, admin/rooms/page.js, admin/tenants/page.js, public/rooms/page.js, app/page.js, public/rooms/page.js)
│   ├── applications/ 
│   ├── auth/
│             ├── approve-user/route.js
│             ├── hash/route.js
│             ├── login/route.js (used by public/login/page.js)
│             ├── me/route.js (used by components/Navbar.js, context/AuthContext.js)
│             └── register/route.js (used by public/register/page.js)
│   ├── payments/ (used by tenant/payments/page.js)
│   ├── tenant/
│             ├── dashboard/route.js ( used by tenant/dashboard/page.js)
│             └── notice/route.js  ( used by tenant/dashboard/page.js)
│   ├── users/profile (used by components/ProfileSettingsModal.js)
│   ├── notifications/  (used by components/Navbar.js)
│   └── maintenance/ (used by admin/maintenance/page.js, tenant/maintenance/page.js)
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
├── utils/                       
│   └── helpers.js               
│
├── public/                     
│   ├── images/                 
│   └── icons/                 
│
├── styles/                     
│   └── custom.css            
│
├── .env
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── next.config.js
├── README.md
└── tsconfig.json              


-- --------------------------------------------------------
-- Boarder-Q Database Schema (Optimized)
-- --------------------------------------------------------

-- 1. ROOMS
CREATE TABLE rooms (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  monthly_rate  DECIMAL(10, 2) NOT NULL,
  amenities     TEXT,
  house_rules   TEXT,
  image_url     VARCHAR(500) DEFAULT NULL,
  location      VARCHAR(255) DEFAULT NULL,
  capacity      INT NOT NULL DEFAULT 1, 
  status        ENUM('available', 'maintenance') NOT NULL DEFAULT 'available',
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS
CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,
  role          ENUM('admin', 'tenant') NOT NULL DEFAULT 'tenant',
  push_token    VARCHAR(255) DEFAULT NULL,
  status        ENUM('pending', 'active', 'suspended') NOT NULL DEFAULT 'pending',
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ROOM TENANTS (This is your "Source of Truth" for occupancy)
CREATE TABLE room_tenants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL,
  user_id INT NOT NULL,
  move_in_date DATE,
  move_out_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. APPLICATIONS
CREATE TABLE applications (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  room_id         INT NOT NULL,
  user_id         INT DEFAULT NULL,
  applicant_name  VARCHAR(100) NOT NULL,
  applicant_email VARCHAR(150) NOT NULL,
  applicant_phone VARCHAR(20),
  message         TEXT,
  status          ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  applied_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at     TIMESTAMP NULL DEFAULT NULL,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 5. PAYMENTS
CREATE TABLE payments (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id        INT NOT NULL,
  room_id          INT NOT NULL,
  amount           DECIMAL(10, 2) NOT NULL,
  method           ENUM('gcash', 'cash') NOT NULL,
  status           ENUM('pending', 'confirmed', 'flagged') NOT NULL DEFAULT 'pending',
  reference_number VARCHAR(100) DEFAULT NULL,
  proof_url        VARCHAR(500) DEFAULT NULL,
  verified_by      INT DEFAULT NULL,
  verified_at      TIMESTAMP NULL,
  due_date         DATE NOT NULL,
  paid_date        DATE DEFAULT NULL,
  month_covered    DATE NOT NULL,
  notes            TEXT,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. MAINTENANCE REQUESTS
CREATE TABLE maintenance_requests (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id   INT NOT NULL,
  room_id     INT NOT NULL,
  title       VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  photo_url   VARCHAR(500) DEFAULT NULL,
  status      ENUM('pending', 'received', 'in_progress', 'resolved') NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- 7. ANNOUNCEMENTS
CREATE TABLE announcements (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  created_by  INT NOT NULL,
  title       VARCHAR(200) NOT NULL,
  body        TEXT NOT NULL,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

## 🚀 Unified Deployment Workflow (The "Golden Thread")

BoarderQ uses a "Golden Thread" logic to connect tenant identities, room preferences, and legal assignments using the **Email Address** as the unique identifier.

### 🏠 Core Philosophy
Unlike traditional systems that use manual "Occupied" toggles, BoarderQ uses **Calculated Occupancy**:
- **Room Status:** Strictly indicates business state (`available` or `maintenance`).
- **Real-time Availability:** Calculated live via `Capacity - Current Tenants = Remaining Slots`.
- **Security:** User accounts remain in a "Pending" state until an Admin verifies payment and officially "Deploys" the tenant.

---

### 🛠 Operational Workflows

#### Scenario A: Sequential Deployment (The Standard Path)
*Use case: User expresses interest before creating an account.*
1.  **Application:** Guest submits a public application for a specific unit (e.g., Unit 2). Status: `Pending`.
2.  **Verification:** Admin reviews the application and confirms payment/deposit externally. Admin clicks **Approve**. Application Status: `Approved`.
3.  **Identity:** User registers an account using the **exact same email**. User Status: `Pending`.
4.  **Deployment:** Admin visits the **Access Control** page. The system "looks ahead" via the Golden Thread, identifies the approved application, and auto-fills the room assignment.
5.  **Finalize:** Admin clicks **Confirm Assignment & Deploy**. User becomes `Active`, and a `room_tenants` record is created.

#### Scenario B: Accelerated Deployment (The "Smart Approve" Path)
*Use case: User registers and applies simultaneously.*
1.  **Concurrent Submission:** User submits an application and registers an account.
2.  **Smart Approval:** Admin clicks **Approve** on the Applications Page. 
3.  **Automation:** The system detects the existing user account and automatically:
    - Sets User to `Active`.
    - Creates the `room_tenants` assignment.
    - Marks Application as `Approved`.
    *Result: Full deployment in a single click.*

---

### 📂 Database & Logic Structure

| Action | `applications` table | `users` table | `room_tenants` table |
|        :--- | :--- | :--- | :--- |
| **Submission** | `status: pending` | `status: pending` | *No record* |
| **Admin Approval** | `status: approved` | *No change* | *No change* |
| **Final Deployment** | `status: approved` | `status: active` | **New Record Created** |

---

### ☁️ Integrated Services
- **Cloudinary:** Used for high-speed delivery of room images and secure storage of payment screenshots (Proof of Payment).
- **MySQL (Railway):** Relational data management ensuring referential integrity between rooms, tenants, and financial logs.



🛠 Technologies Used (Boarder-Q Stack)
1. Frontend (The User Interface)
Next.js (App Router): The main framework for building the web application.
React.js: The library used for building the interactive components and managing state.
Tailwind CSS: Used for all the styling. (You can tell by the utility classes like bg-[#F8FAFC] and rounded-[2rem] in your code).
Framer Motion: Used for the smooth modal transitions and entrance animations (AnimatePresence and motion.div).
Lucide React: The icon library used for the UI (e.g., MapPin, Users, ShieldCheck).
2. Backend (The Logic)
Next.js API Routes: Server-side functions that handle requests for users, rooms, and payments.
Node.js: The runtime environment that executes the backend JavaScript code.
MySQL2: The driver used to allow the app to communicate with your MySQL database using "Promises" (for better performance).
JWT (JSON Web Tokens): Used for secure user authentication and login sessions.
3. Cloud Services & Infrastructure
Railway.app: The cloud platform used to host your MySQL Database and keep it online 24/7.
Cloudinary API: The cloud storage service used for Image Management. This handles the room photos and the tenant's payment screenshots.
Vercel (Recommended for deployment): The platform used to host the frontend of the website.
4. Database Architecture (MySQL)
Relational Database Design: Using multiple tables (users, rooms, room_tenants, applications, payments) with Foreign Key relationships to ensure data integrity.
Computed Occupancy Logic: A custom logic we implemented that calculates room availability in real-time based on current tenant records.


Framework: Next.js 14+ (App Router Architecture)

UI/UX: Tailwind CSS, Framer Motion (Animations), Lucide Icons.

State Management: React Context API (Sidebar/Theme), React Hooks (useState, useEffect, useParams).

Backend Runtime: Node.js.

Database: MySQL (Relational), Connection Pooling (mysql2/promise).

Authentication: JWT (Stateless Auth), Password Hashing, Role-Based Access Control (RBAC).

Cloud Storage: Cloudinary API (Image hosting & transformation).

Deployment: Railway (Database), Vercel (Frontend).

Advanced Logic: SQL Transactions (ACID compliance), Computed Occupancy algorithms.