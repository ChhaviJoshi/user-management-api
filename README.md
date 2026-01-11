# User Management API

A robust RESTful API built with Node.js and Express that handles user authentication, management (CRUD), and data caching. This project demonstrates secure backend practices including JWT authentication, role-based protection, and database optimization.

## 🚀 Features

- **Authentication:** Secure Login and Registration using JSON Web Tokens (JWT).
- **CRUD Operations:** Create, Read, Update, and Delete users.
- **Security:** Middleware to protect routes; users can only modify/delete their own accounts.
- **Performance:** Implemented `node-cache` (Redis pattern) to cache user data and reduce database load.
- **Database:** Persistent storage using PostgreSQL.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken)
- **Caching:** node-cache
- **Tools:** Nodemon, Dotenv

## ⚙️ Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-link-here>
    cd <user-management-api>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=your_postgres_user
    DB_PASS=your_postgres_password
    DB_NAME=your_database_name
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run the Server:**
    ```bash
    # Development mode (restarts on save)
    npx nodemon index.js
    ```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description           | Auth Required |
| :----- | :------------------- | :-------------------- | :------------ |
| `POST` | `/api/auth/register` | Register a new user   | ❌            |
| `POST` | `/api/auth/login`    | Login and receive JWT | ❌            |

### User Management

| Method   | Endpoint         | Description                               | Auth Required   |
| :------- | :--------------- | :---------------------------------------- | :-------------- |
| `GET`    | `/api/users`     | Get all users (with Pagination & Caching) | ✅ (Token)      |
| `PUT`    | `/api/users/:id` | Update user profile                       | ✅ (Owner Only) |
| `DELETE` | `/api/users/:id` | Delete user account                       | ✅ (Owner Only) |

## 🧪 Testing

You can test the API using **Postman** or **cURL**.

1.  **Login** to get a token.
2.  Copy the `token` from the response.
3.  For protected routes, add the token to the Headers:
    - **Key:** `Authorization`
    - **Value:** `Bearer <your_token_here>`

## 📝 Project Structure

```text
├── controllers/    # Business logic (User & Auth)
├── middleware/     # Security checks (JWT Verification)
├── models/         # Database queries
├── routes/         # API Route definitions
├── index.js        # Entry point
└── .env            # Environment configurations
```
Created by Chhavi Joshi