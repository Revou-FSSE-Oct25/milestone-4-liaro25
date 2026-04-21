# RevoBank API — Backend System

A production-ready backend API simulating a **digital banking system**, built with modern backend architecture using **NestJS, Prisma, and PostgreSQL**.

---

## 🚀 Live API (Swagger)

https://milestone4-liaro-api.up.railway.app/api

Interactive API documentation powered by Swagger.
You can test all endpoints directly from this interface, including authenticated routes using Bearer Token.

## 📄 Documentation (Notion)

https://noto.li/LP1nZ5

---

## Project Overview

This project demonstrates a complete backend system including:

- Secure authentication flow (JWT-based)
- Account ownership & authorization logic
- Transaction handling (deposit, withdraw, transfer)
- Scalable modular architecture (NestJS)

Designed to reflect real-world backend patterns used in fintech applications.

---

## Tech Stack

- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL (Supabase)
- **Authentication:** JWT
- **Deployment:** Railway

---

## System Architecture

Modular structure following NestJS best practices:

```bash
src/
├── auth/          # Authentication & JWT
├── user/          # User management
├── account/       # Account ownership & balance
├── transaction/   # Financial operations
├── prisma/        # Database service layer
├── app.module.ts
└── main.ts
```

---

## Key Features

### Authentication

- User registration and login
- Password hashing using bcrypt
- JWT-based authorization

### User Profile

- Get authenticated user profile
- Update user profile (name and optional email)

### Account System

- Create and manage multiple accounts
- Ownership validation per user
- Balance tracking

### Transaction Engine

- Deposit
- Withdraw
- Transfer between accounts
- Transaction history tracking
- Atomic balance updates using Prisma transactions to ensure data consistency

### Security

- JWT-based authentication (no fallback secret in production)
- Protected routes using JwtAuthGuard
- Users can only access their own accounts and transactions
- Sensitive data (e.g. password) is never exposed in API responses
- Input validation using DTO and class-validator

---

## API Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### User

- `GET /user/profile`
- `PATCH /user/profile`

### Account

- `POST /accounts`
- `GET /accounts`
- `GET /accounts/:id`
- `PATCH /accounts/:id`
- `DELETE /accounts/:id`

### Transaction

- `POST /transactions/deposit`
- `POST /transactions/withdraw`
- `POST /transactions/transfer`
- `GET /transactions`
- `GET /transactions/:id`

---

## Deployment Highlights

- Hosted on Railway
- Automatic Prisma Client generation during build
- Environment-based configuration for production

### Build Configuration

```
{
  "scripts": {
    "build": "prisma generate && nest build",
    "start": "node dist/src/main.js"
  }
}
```

### Port Configuration

```bash
process.env.PORT

```

---

## Local Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd milestone-4-liaro25
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

### 4. Run Application

```bash
npm run build
npm run start
```

---

## Key Learnings

- Managing Prisma schema and client generation in production
- Handling environment differences between local and deployment
- Debugging build and runtime issues in cloud environments
- Structuring scalable backend modules using NestJS
- Implementing transaction logic with proper data integrity

---

## Author

Lia Rosliany
