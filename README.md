# SE_Project - project of **Introduction to Software Engineering** course

## Introduction

SE_Project is a hospital management system consisting of three main components:

- **Back-end**: RESTful API built with Java Spring Boot.
- **Front-end**: ReactJS web application for end users.
- **Database Migration**: Uses Knex.js for schema management and seeding data.

---

## Project Structure

```
.
├── back-end/         # Spring Boot API
├── db_migration/     # Database migration and seeding with Knex.js
├── front-end/        # ReactJS web application
└── README.md         # This file
```

---

## System Requirements

- Node.js >= 14.x (for front-end and db_migration)
- Java 17+ (for back-end)
- Maven (for back-end)
- SQL Server

---

## Installation Guide

### 1. Database Migration

1. Install dependencies:
   ```sh
   cd db_migration
   npm install
   ```
2. Configure database connection in `db_migration/knexfile.js` and `.env`.
3. Run migrations and seeders:
   ```sh
   npx knex migrate:latest
   npx knex seed:run
   ```

### 2. Back-end (Spring Boot)

1. Install dependencies:
   ```sh
   cd back-end
   ./mvnw clean install
   ```
2. Configure database in `src/main/resources/application.properties`.
3. Start the server:
   ```sh
   ./mvnw spring-boot:run
   ```
   The API will be available at `http://localhost:8080` by default.

### 3. Front-end (ReactJS)

1. Install dependencies:
   ```sh
   cd front-end
   npm install
   ```
2. Start the application:
   ```sh
   npm start
   ```
   The app will run at `http://localhost:3000`.

---

## Main Features

- Appointment scheduling, patient, doctor, drug, and prescription management.
- Chat and video call between patients and doctors.
- Online payment integration (VNPAY).
- Drug search, prescription management, and medical history tracking.

---

## Useful Commands

- **Back-end**:  
  - Build: `./mvnw clean install`
  - Run: `./mvnw spring-boot:run`
- **Front-end**:  
  - Run: `npm start`
  - Build: `npm run build`
- **DB Migration**:  
  - Migrate: `npx knex migrate:latest`
  - Seed: `npx knex seed:run`