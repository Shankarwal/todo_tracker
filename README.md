# Todo_Tracker

Welcome to Todo_Tracker! This is a simple task management web application designed to help users manage their tasks efficiently. Users can perform the following actions:

- **Login and Sign Up:** Users can create an account or log in using existing credentials.
- **Add Tasks:** Add new tasks with details such as title, description, and status.
- **Update and Delete Tasks:** Modify task details or remove tasks as needed.
- **Change Task Status:** Update task status between "New," "In Progress," or "Complete"
- **Filter Tasks:** Filter tasks based on their status.

## Technologies Used

- Frontend: React, React-Bootstrap, React-hook-form, React-redux/Redux-toolkit.
- Backend: NestJS, MongoDB Cloud, PassportJS.
- Authentication: JWT (JSON Web Tokens).

## Prerequisites

Before running the application, make sure you have the following:

- MongoDB Atlas account: Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), and set up a cluster. Obtain your MongoDB connection URI.
- JWT Secret: Generate a strong random secret key to use for JWT token generation.
- Replace `YOUR_MONGO_DB_URI_HERE` with your MongoDB connection URI obtained from MongoDB Atlas, and `YOUR_JWT_SECRET_HERE` with your generated JWT secret key in the .env file of Server.

### To run this project locally, follow these steps:

1. Clone the repository from GitHub:
2. Open the project folder in VS Code or any editor of your choice.

### Installation - Server

3. Open new terminal
4. cd server
5. yarn
6. yarn start:dev

### Installation - Client

7. Open another new terminal
8. cd client
9. yarn
10. yarn dev
11. Open your web browser and visit `http://localhost:5173/` to view the application.

## Usage

- Register a new account or log in with existing credentials.
- Once logged in, you'll land on the dashboard where you can add, update, delete tasks.
- Use the check-box dropdown to change the status of tasks.
- Use the filter options to view tasks based on their status.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request with your proposed changes.
