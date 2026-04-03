# Mini CRM System (Next.js + React, JavaScript)

Simple CRM dashboard built from the assignment PDF.

## Features

- Dashboard with total customers + status counts + simple chart
- Customer management (add, edit, delete, list)
- Customer detail page (`/customers/[id]`)
- Activity/notes timeline per customer
- Search by name/email
- Filters by status and company
- API routes (`GET`, `POST`, `PUT`, `DELETE`)

## Tech

- Next.js (App Router)
- React (JavaScript only)
- In-memory data store (for demo/assignment use)

## Local Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deployment Ready

This project is ready to deploy on Vercel.

### Option A: Vercel Dashboard (easiest)

1. Push this folder to a GitHub repository.
2. Go to Vercel and click **Add New Project**.
3. Import the GitHub repository.
4. Keep defaults:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output: auto
5. Click **Deploy**.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
```

For production:

```bash
vercel --prod
```

## Pre-deploy Check

```bash
npm run deploy:check
```

## Important Note

Data is stored in memory (`lib/store.js`), so deployed data resets when server instances restart.
For persistent production data, connect a real database (MongoDB/PostgreSQL).
