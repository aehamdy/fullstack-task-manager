# Fullstack Task Manager

A complete fullstack application for managing tasks, featuring a React frontend and a Node.js/Express backend with SQLite database.

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Assumptions](#-assumptions)

## ✨ Features

- **User Authentication**: Secure registration and login using JWT.
- **Task Management**: Create, read, update, and delete tasks.
- **Responsive UI**: Built with React and TailwindCSS (inferred).
- **Persistent Data**: SQLite database for storing users and tasks.

## 🛠 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## 📂 Project Structure

```
fullstack-task-manager/
├── backend/            # Express, Node.js, SQLite
│   ├── server.js       # API Routes and Server Logic
│   ├── database.js     # Database connection and schema
│   └── database.sqlite # SQLite database file (generated)
└── frontend/           # React, Vite, TypeScript
    ├── src/            # Source code
    └── vite.config.ts  # Vite configuration
```

## ⚙ Setup & Installation

You need to set up both the backend and frontend.

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  (Optional) Configure environment variables. Currently, secrets are hardcoded in `server.js`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## 🚀 Running the Application

### Start the Backend

Run the following command in the `backend` directory:
```bash
node server.js
```
*The server will start on `http://localhost:3000`.*

### Start the Frontend

Run the following command in the `frontend` directory:
```bash
npm run dev
```
*The application will typically start on `http://localhost:5173` (check terminal output).*

## 📡 API Documentation

Base URL: `http://localhost:3000`

### Authentication

| Method | Endpoint | Description | Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/register` | Register a new user | `{ "name": "User", "email": "user@example.com", "password": "password" }` |
| **POST** | `/api/login` | Login to get JWT | `{ "email": "user@example.com", "password": "password" }` |

### Tasks

**Note**: All task endpoints require `Authorization: Bearer <token>` header.

| Method | Endpoint | Description | Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Get all tasks for user | N/A |
| **POST** | `/api/tasks` | Create a new task | `{ "title": "My Task", "description": "Details..." }` |
| **PUT** | `/api/tasks/:id` | Update a task | `{ "title": "...", "description": "...", "status": "..." }` |
| **DELETE** | `/api/tasks/:id` | Delete a task | N/A |

### Health Check

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Verify backend is running |

## 📸 Screenshots

*(Placeholders - Please capture these by running the application locally)*

### Login Page
![Login Page](./docs/screenshots/login.png)

### Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

## 📝 Assumptions

1.  **Environment**: It is assumed that the port `3000` is free for the backend and `5173` (default Vite port) is free for the frontend.
2.  **Database**: The application uses SQLite, so no external database server (like MongoDB or PostgreSQL) is required. The `database.sqlite` file is created locally.
3.  **Secrets**: The JWT secret is currently hardcoded in `server.js` (`your_jwt_secret_key`). In a real production app, this should be in a `.env` file.
4.  **Frontend Configuration**: The frontend API URL is assumed to be pointing to `http://localhost:3000` based on the analysis.
