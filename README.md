# Ecommerce Backend

A REST API for an ecommerce application built with **Node.js + TypeScript + Express + Sequelize (PostgreSQL)**. Provides authentication, role/permission management, products, categories, cart, favourites and orders, with JWT auth, image upload (Multer) and email (Nodemailer).

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Running the Server](#running-the-server)
8. [API Endpoints](#api-endpoints)
9. [Authentication Flow](#authentication-flow)
10. [File Uploads](#file-uploads)
11. [Roles & Permissions](#roles--permissions)
12. [Email (Nodemailer) Setup](#email-nodemailer-setup)
13. [Postman Collection](#postman-collection)
14. [Troubleshooting](#troubleshooting)

---

## Tech Stack

- **Runtime:** Node.js (v18+ recommended)
- **Language:** TypeScript
- **Framework:** Express 4
- **ORM:** Sequelize 6
- **Database:** PostgreSQL
- **Auth:** JSON Web Token (`jsonwebtoken`) + `bcryptjs`
- **Uploads:** Multer (memory storage, static served from `src/utils/upload`)
- **Email:** Nodemailer
- **Dev Tool:** Nodemon (runs `.ts` directly)

---

## Project Structure

```
Ecommerce-Backend/
├── index.ts                    # App entry — DB sync, middleware, route mounting
├── package.json
├── tsconfig.json
├── src/
│   ├── config/
│   │   └── database.ts         # Sequelize connection (reads .env)
│   ├── controller/             # Request handlers (auth, product, order, cart, ...)
│   ├── service/                # Business logic
│   ├── repository/             # DB access layer
│   ├── models/                 # Sequelize models + association.ts
│   ├── middlewares/
│   │   ├── authetication.ts    # JWT verification
│   │   ├── Role.ts             # Role-based gate
│   │   └── permission.ts       # Permission-based gate
│   ├── routes/                 # Route definitions per resource
│   ├── utils/
│   │   ├── upload/             # Uploaded files (served statically)
│   │   ├── masterFiles/        # Seed/master data
│   │   └── types/              # Shared TS types
│   └── postmanApi/             # Postman collection(s)
└── dist/                       # Compiled output (if you build)
```

---

## Prerequisites

Install these first:

| Tool       | Version | Notes                                                  |
|------------|---------|--------------------------------------------------------|
| Node.js    | 18 LTS+ | <https://nodejs.org/>                                  |
| npm        | 9+      | Comes with Node.js                                     |
| PostgreSQL | 13+     | <https://www.postgresql.org/download/>                 |
| Git        | latest  | To clone the repo                                      |

Optional:
- **pgAdmin** or **DBeaver** for inspecting the database
- **Postman** for testing endpoints

Verify installs:

```bash
node -v
npm -v
psql --version
```

---

## Installation

```bash
# 1. Clone
git clone <repo-url>
cd Ecommerce-Backend

# 2. Install dependencies
npm install
```

> The `start` script uses `nodemon index.ts` directly, so you don't need a separate build step for development. `ts-node` is pulled in transitively. If you run into module-resolution errors, install it explicitly:
> ```bash
> npm install -D ts-node typescript
> ```

---

## Environment Variables

Create a file named **`.env`** in the project root (same level as `index.ts`):

```env
# Server
PORT=5000

# PostgreSQL (variable names match src/config/database.ts)
MySQL_DATABASE_NAME=ecommerce_db
MySQL_USERNAME=postgres
MySQL_PASSWORD=your_postgres_password

# JWT
jwt_secret=super_long_random_secret_change_me

# Public server URL — used to build absolute image URLs in responses
server=http://localhost:5000
```

> ⚠️ The variable names are intentionally written exactly as the code expects them (e.g. `MySQL_DATABASE_NAME` even though the DB is Postgres, and lowercase `jwt_secret` / `server`). Don't rename them in `.env` without also updating the code.

For Nodemailer (if you use the email features in `authController`), add your SMTP credentials too — see [Email Setup](#email-nodemailer-setup).

---

## Database Setup

1. **Start PostgreSQL** locally.
2. **Create the database** the app will connect to:

   ```bash
   psql -U postgres
   ```
   ```sql
   CREATE DATABASE ecommerce_db;
   \q
   ```

3. The app uses `db.sync({ alter: true })` on boot (see [index.ts:16](index.ts#L16)). On the **first run**, Sequelize will auto-create all tables from the models in [src/models/](src/models/) and adjust them on subsequent runs.

   > For production, switch to migrations instead of `alter: true`.

4. The DB host is hard-coded to `localhost` in [src/config/database.ts:6](src/config/database.ts#L6). Edit that file if your Postgres runs elsewhere.

---

## Running the Server

```bash
npm start
```

Expected output:

```
Database is connected successfully
Server is accesssing on port : 5000
```

The API is now reachable at `http://localhost:5000`.

Uploaded files are served from `http://localhost:5000/src/utils/upload/<filename>`.

---

## API Endpoints

All routes are mounted in [index.ts:31-37](index.ts#L31-L37). Base URL: `http://localhost:<PORT>`.

### Auth — `/api/auth`
| Method | Path                    | Auth | Description                |
|--------|-------------------------|------|----------------------------|
| POST   | `/createUser`           | ❌   | Register (multipart, field `image`) |
| POST   | `/loginController`      | ❌   | Login, returns JWT         |
| PUT    | `/updateUser/:id`       | ✅   | Update user (multipart)    |
| GET    | `/GetUserById/:id`      | ✅   | Single user                |
| GET    | `/GetAllUsers`          | ✅   | All users                  |
| DELETE | `/DeleteUser/:id`       | ✅   | Delete one                 |
| DELETE | `/BulkDeleteUser`       | ✅   | Bulk delete                |
| DELETE | `/logoutController`     | ❌   | Logout                     |

### Product — `/api/product`
`createProduct`, `UpdateProduct/:id`, `GetProductById/:id`, `GetAllProducts`, `DeleteProduct/:id`, `BulkDeleteProduct` (image field: `image`).

### Category — `/api/category`
`createCategory`, `UpdateCategory/:id`, `GetCategoryById/:id`, `GetAllCategorys`, `DeleteCategory/:id`, `BulkDeleteCategorys`.

### Cart — `/api/cart`
`createCart`, `updateCart/:id`, `GetCartById/:id`, `GetCartByUserId/:user_id`, `GetAllCarts`, `DeleteCart/:id`, `BulkDeleteCarts`.

### Favourites — `/api/favourtie` *(note the spelling — see [index.ts:35](index.ts#L35))*
`createfavourites`, `updatefavourites/:id`, `GetfavouritesById/:id`, `GetAllFavouritesByauthId/:id`, `GetAllfavouritess`, `Deletefavourites/:id`, `BulkDeletefavourites`.

### Order — `/api/order`
`CreateOrder`, `UpdateOrder/:id`, `UpdateOrderStatus/:id`, `UpdatePaymentStatus/:id`, `GetOrderById/:id`, `GetAllOrders`, `DeleteOrder/:id`, `BulkDeleteOrders`.

### Role — `/api/role`
`CreateRole`, `UpdateRole/:id`, `GetRoleById/:id`, `GetAllRoles`, `DeleteRole/:id`, `BulkDeleteProduct`.

---

## Authentication Flow

1. **Register** via `POST /api/auth/createUser` (multipart form).
2. **Login** via `POST /api/auth/loginController` — receive a JWT.
3. Send the token on every protected request:

   ```http
   Authorization: Bearer <jwt_token>
   ```

JWT is verified in [src/middlewares/authetication.ts](src/middlewares/authetication.ts) using `process.env.jwt_secret`.

---

## File Uploads

- Uses **Multer** with **memory storage** (see [src/routes/authRoutes.ts:12](src/routes/authRoutes.ts#L12)).
- Field name expected by `createUser` / `updateUser` / `createProduct` / `UpdateProduct`: **`image`**.
- Final files end up under [src/utils/upload/](src/utils/upload/) and are served statically at `/src/utils/upload/<file>`.

Make sure the directory exists and is writable:

```bash
mkdir -p src/utils/upload
```

---

## Roles & Permissions

Two middlewares run after authentication on most routes:

- [src/middlewares/Role.ts](src/middlewares/Role.ts) — gates by role.
- [src/middlewares/permission.ts](src/middlewares/permission.ts) — gates by fine-grained permission.

Seed data lives in [src/utils/masterFiles/](src/utils/masterFiles/). On first run you'll need at least one admin role/permission set to access protected admin endpoints — create them directly in the DB or via the `Role` endpoints once an initial user has the necessary access.

---

## Email (Nodemailer) Setup

`authController` uses Nodemailer (e.g. for welcome / reset flows). If you enable those flows, add SMTP credentials to `.env` and configure your transporter, for example with Gmail App Passwords:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=youraddress@gmail.com
SMTP_PASS=your_app_password
```

Then plug them into the `nodemailer.createTransport(...)` call inside [src/controller/authController.ts](src/controller/authController.ts).

---

## Postman Collection

A Postman collection is included under [src/postmanApi/](src/postmanApi/). Import it into Postman:

1. **File → Import** → choose the file from `src/postmanApi/`.
2. Create an environment with variables:
   - `baseUrl` = `http://localhost:5000`
   - `token`   = *(paste JWT from login response)*
3. Hit `Login` first, copy the token, then call protected endpoints.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `ECONNREFUSED 127.0.0.1:5432` | Postgres not running, or wrong port. Start the Postgres service. |
| `password authentication failed for user "postgres"` | Wrong `MySQL_PASSWORD` in `.env`. |
| `database "ecommerce_db" does not exist` | Create it: `CREATE DATABASE ecommerce_db;`. |
| `Cannot find module 'ts-node'` when running `npm start` | `npm i -D ts-node typescript`. |
| `jwt malformed` / `invalid signature` | Missing `Authorization: Bearer <token>` header, or `jwt_secret` differs from the one used at login. Re-login. |
| Image URLs return 404 | Ensure `src/utils/upload/` exists and `server` in `.env` matches the host you're hitting. |
| Port already in use | Change `PORT` in `.env` or stop the process using it. |
| `db.sync` keeps altering columns | Expected in dev (`alter: true`). Disable for prod. |

---

## License

ISC
