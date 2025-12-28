# Task Manager Backend

This is the backend for a Task Manager application, built with Node.js, Express, and SQLite. It provides a RESTful API for user authentication and task management.

## Features

- **User Authentication**: Register and Login with JWT (JSON Web Tokens).
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **Data Persistence**: Uses SQLite for a lightweight, serverless database.
- **Security**: Password hashing with bcrypt.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1.  Clone the repository or navigate to the project directory.
2.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

The application currently uses hardcoded configuration in `server.js` (e.g., JWT Secret).
*Note: In a production environment, variables like `SECRET` should be stored in a `.env` file.*

- **Database**: The SQLite database file `database.sqlite` will be automatically created in the root directory if it doesn't exist.
- **Port**: The server runs on port `3000` by default.

## Running the Server

To start the backend server, run:

```bash
node server.js
```

You should see:
```
Server running on http://localhost:3000
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/register` | Register a new user | `{ "name": "...", "email": "...", "password": "..." }` |
| `POST` | `/api/login` | Login and get JWT | `{ "email": "...", "password": "..." }` |

### Tasks

All task endpoints require the `Authorization` header with a Bearer token: `Authorization: Bearer <your_token>`

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get all tasks for user | N/A |
| `POST` | `/api/tasks` | Create a new task | `{ "title": "...", "description": "..." }` |
| `PUT` | `/api/tasks/:id`| Update a task | `{ "title": "...", "description": "...", "status": "..." }` |
| `DELETE`| `/api/tasks/:id`| Delete a task | N/A |

### Health Check

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Verify backend is working |

## Project Structure

- `server.js`: Main application file containing API routes and server logic.
- `database.js`: Database configuration and schema initialization.
- `package.json`: Project dependencies and scripts.
