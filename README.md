# smart-budget-tracker-api
A RESTful API that allows users to manage their budgets, track income and expenses, and generate financial reports. Users can register, log in, and perform CRUD operations on budgets and transactions.

Key Features:
User registration and authentication (JWT)
CRUD operations for budgets
CRUD operations for transactions (income/expense)
Monthly summary and financial reports
Secure endpoints with role-based access if needed

2️⃣ Suggested Tech Stack
Backend Framework: Node.js + Express
Database: PostgreSQL (relational structure for users, budgets, and transactions)
Authentication: JWT
Documentation: Swagger or Postman collection
Testing: Jest or Mocha

3️⃣ Data Models
User
id (PK)
name
email (unique)
password (hashed)
created_at
Budget
id (PK)
user_id (FK)
name
amount
created_at
updated_at
Transaction
id (PK)
budget_id (FK)
type (income/expense)
amount
category
description
date
created_at
updated_at