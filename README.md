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

----------------------------------

DESIGN REQUIREMENTS:

- Use Tailwind CSS
- Clean, modern, minimal UI
- Use cards, grids, and spacing
- Responsive design
- Use reusable components (Navbar, Card, Button)
- Add icons if possible (Heroicons or similar)

----------------------------------

IMPORTANT:

- Use mock data (hardcoded arrays)
- No backend or API calls yet
- Use proper folder structure (App Router)
- Use ONLY JavaScript (.js files), NOT TypeScript
- Do NOT use TypeScript types or interfaces
- Code must be clean and organized

----------------------------------

OUTPUT FORMAT:

- Provide full folder structure
- Provide code per page/component
- Make sure everything is ready to run in Next.js

----------------------------------

Goal:
A complete working frontend prototype of the BoarderQueue system using JavaScript.



I-divide nato atong tasks para dili mag conflict:

1. Dashboard + Rooms + Announcements   - CHE
2. Payments (landlord + tenant)        - MAYMAY
3. Maintenance + Applications          - XHYNDY

IMPORTANT:

* Ayaw mo edit same files
* Always create your own branch
* Pull before starting


FULL FOLDER STRUCTURE
boarderqueue_system/
│
├── app/                         # Main App Router (pages + API)
│   ├── layout.js                # Global layout - CHE
│   ├── page.js                  # Landing page (/) - CHE
│   ├── globals.css
│
│   ├── rooms/                   # Public rooms browsing
│   │   └── page.js              # /rooms - CHE
│
│   ├── apply/                   # Application form
│   │   └── page.js              # /apply - XHYNDY
│
│   ├── login/
│   │   └── page.js              - CHE
│
│   ├── register/
│   │   └── page.js              - CHE
│
│   ├── dashboard/               # Landlord side
│   │   ├── page.js              # /dashboard - CHE
│   │   │
│   │   ├── rooms/
│   │   │   └── page.js          # Manage rooms - CHE 
│   │   │
│   │   ├── applications/
│   │   │   └── page.js          - XHYNDY
│   │   │
│   │   ├── payments/
│   │   │   └── page.js          - MAYMAY
│   │   │
│   │   └── maintenance/
│   │       └── page.js          - XHYNDY
│
│   ├── tenant/                  # Tenant side
│   │   ├── dashboard/
│   │   │   └── page.js          - CHE
│   │   │
│   │   ├── payments/
│   │   │   └── page.js          - MAYMAY
│   │   │
│   │   ├── maintenance/
│   │   │   └── page.js          - MAYMAY
│   │   │
│   │   └── announcements/
│   │       └── page.js          - AKO
│
│   └── api/                     # Backend (later)
│       ├── rooms/
│       │   └── route.js
│       │
│       ├── applications/
│       │   └── route.js
│       │
│       ├── auth/
│       │   └── route.js
│       │
│       ├── payments/
│       │   └── route.js
│       │
│       └── maintenance/
│           └── route.js
│
├── components/                  # Reusable UI components
│   ├── Navbar.js
│   ├── RoomCard.js
│   ├── Button.js
│   ├── Sidebar.js
│   └── Card.js
│
├── lib/                         # Core logic (later)
│   ├── db.js                    # MySQL connection
│   └── auth.js                  # Authentication helpers
│
├── utils/                       # Helper functions
│   └── helpers.js
│
├── public/                      # Static files
│   ├── images/
│   └── icons/
│
├── styles/                      # Optional extra styles
│   └── custom.css
│
├── .gitignore
├── package.json
├── next.config.js
├── README.md
└── jsconfig.json               # Optional (path aliases)











NEW:

boarderqueue_system/
│
├── app/                         # Main App Router (pages + API)
│   ├── layout.js                # Global layout (SHARED — OWNER: IKAW)
│   ├── page.js                  # Landing page (SHARED — OWNER: IKAW)
│   ├── globals.css
│
│   ├── rooms/                   # Public rooms browsing
│   │   └── page.js              # /rooms (IKAW)
│
│   ├── apply/                   # Application form
│   │   └── page.js              # /apply (Xhyndy)
│
│   ├── login/
│   │   └── page.js              # Login page (SHARED — OWNER: IKAW)
│
│   ├── register/
│   │   └── page.js              # Register page (SHARED — OWNER: IKAW)
│
│   ├── dashboard/               # Landlord side
│   │   ├── page.js              # /dashboard main (IKAW)
│   │   │
│   │   ├── rooms/
│   │   │   └── page.js          # Manage rooms (IKAW)
│   │   │
│   │   ├── applications/
│   │   │   └── page.js          # Applications management (Xhyndy)
│   │   │
│   │   ├── payments/
│   │   │   └── page.js          # Payments (Maymay)
│   │   │
│   │   └── maintenance/
│   │       └── page.js          # Maintenance (Xhyndy)
│
│   ├── tenant/                  # Tenant side
│   │   ├── dashboard/
│   │   │   └── page.js          # Tenant dashboard (IKAW)
│   │   │
│   │   ├── payments/
│   │   │   └── page.js          # Tenant payments (Maymay)
│   │   │
│   │   ├── maintenance/
│   │   │   └── page.js          # Tenant maintenance (Xhyndy)
│   │   │
│   │   └── announcements/
│   │       └── page.js          # Tenant announcements (SHARED — OWNER: IKAW)
│
│   └── api/                     # Backend (later, can be shared)
│       ├── rooms/
│       │   └── route.js          # (IKAW)
│       │
│       ├── applications/
│       │   └── route.js          # (Xhyndy)
│       │
│       ├── auth/
│       │   └── route.js          # (IKAW)
│       │
│       ├── payments/
│       │   └── route.js          # (Maymay)
│       │
│       └── maintenance/
│           └── route.js          # (Xhyndy)
│
├── components/                  # Reusable UI components
│   ├── Navbar.js                 # SHARED — OWNER: IKAW
│   ├── Sidebar.js                # SHARED — OWNER: IKAW
│   ├── Button.js                 # SHARED — Owner: whoever creates new usage
│   ├── Card.js                   # SHARED — reusable, safe to copy for feature
│   ├── RoomCard.js               # IKAW
│   ├── PaymentCard.js            # Maymay (new component)
│   ├── MaintenanceCard.js        # Xhyndy (new component)
│   └── ApplicationCard.js        # Xhyndy (new component)
│
├── lib/                         # Core logic (later)
│   ├── db.js                    # (SHARED — OWNER: IKAW)
│   └── auth.js                  # (SHARED — OWNER: IKAW)
│
├── utils/                       # Helper functions
│   └── helpers.js               # SHARED
│
├── public/                      # Static files
│   ├── images/                  # SHARED
│   └── icons/                   # SHARED
│
├── styles/                      # Optional extra styles
│   └── custom.css               # SHARED
│
├── .gitignore
├── package.json
├── next.config.js
├── README.md
└── jsconfig.json               # Optional (path aliases)