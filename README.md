
# Assignment Submission Portal

This project is a backend system built with Node.js, Express, and MongoDB. It allows users to upload assignments and allows admins to view, accept, or reject these assignments. The system supports authentication for both users and admins.

---

## Features
- User and Admin registration and login.
- Users can upload assignments.
- Admins can view, accept, or reject assignments.
- JSON Web Token (JWT) based authentication.
- MongoDB as the database.

---

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community) (if using locally)
- [Postman](https://www.postman.com/downloads/) (for testing API endpoints)

---

## Project Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/assignment-portal.git
cd assignment-portal
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run the Server
To start the server, run:

```bash
node server.js
```

The server should now be running on:
```
http://localhost:5001
```

---

## Folder Structure
```
assignment-portal/
├── controllers/
│   ├── adminController.js
│   └── userController.js
├── models/
│   ├── assignmentModel.js
│   ├── userModel.js
│   └── adminModel.js
├── routes/
│   ├── adminRoutes.js
│   └── userRoutes.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── .env
├── server.js
├── package.json
└── README.md
```

---

## API Endpoints Documentation

### User Endpoints
1. **Register a User**
   - **Endpoint**: `POST /api/users/register`
   - **Body**:
     ```json
     {
       "username": "Soham",
       "password": "password123"
     }
     ```

2. **Login a User**
   - **Endpoint**: `POST /api/users/login`
   - **Body**:
     ```json
     {
       "username": "Soham",
       "password": "password123"
     }
     ```

3. **Upload an Assignment**
   - **Endpoint**: `POST /api/users/upload`
   - **Headers**:
     ```
     Authorization: Bearer your_jwt_token
     ```
   - **Body**:
     ```json
     {
       "task": "Complete the project report",
       "admin": "64b7f7b4c25d23fa5e87f0d1"
     }
     ```

4. **Fetch All Admins**
   - **Endpoint**: `GET /api/users/admins`

### Admin Endpoints
1. **Register an Admin**
   - **Endpoint**: `POST /api/admins/register`
   - **Body**:
     ```json
     {
       "username": "Alok",
       "password": "adminpass123"
     }
     ```

2. **Login an Admin**
   - **Endpoint**: `POST /api/admins/login`
   - **Body**:
     ```json
     {
       "username": "Alok",
       "password": "adminpass123"
     }
     ```

3. **View Assignments**
   - **Endpoint**: `GET /api/admins/assignments`

4. **Accept or Reject an Assignment**
   - **Endpoint**: `POST /api/admins/assignments/:id/accept`
