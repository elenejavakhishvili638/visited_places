# Visited places App

This full-stack application offers users a platform to share and discover various places they've visited. With authentication, users can register and contribute their own places while exploring the places added by other members. Each place showcases a title, description, image, and its precise location on a map. Users can only delete or update the details of the places they've added.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)

## Prerequisites

Before getting started with the app, ensure the following tools are installed:

- [Node.js](https://nodejs.org/) - Version 16.3.0 or higher
- [npm](https://www.npmjs.com/) - Node.js package manager

## Tech Stack

The application is crafted using a combination of the following technologies:

### Backend:

- [Node.js](https://nodejs.org/): Executes JavaScript code on the server-side.
- [Express.js](https://expressjs.com/): Web application framework streamlining API development.
- [Mongoose](https://mongoosejs.com/): MongoDB object modeling for Node.js.
- [express-validator](https://express-validator.github.io/docs/): Middlewares to validate and sanitize input.
- [multer](https://www.npmjs.com/package/multer): Handles file uploads.
- [uuid](https://www.npmjs.com/package/uuid): Generates unique identifiers.
- [bcrypt](https://www.npmjs.com/package/bcrypt): Password hashing utility.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Implements JSON web tokens for authentication.

### Frontend:

- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [react-dom](https://reactjs.org/docs/react-dom.html): Serves as the entry point to the DOM and server renderers for React.
- [react-icons](https://react-icons.github.io/react-icons/): Popular icons in your React projects.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start): Enables routing in React applications.
- [react-transition-group](https://reactcommunity.org/react-transition-group/): Enables smooth transitions in React components.

## Getting Started

To set up the User Places application, follow the steps below:

1. Clone the User Places repository from GitHub:

   ```bash
   git clone https://github.com/elenejavakhishvili638/visited_places.git
   ```

2. Change to the project directory:

   ```bash
   cd visited_places
   ```

3. For backend setup, navigate to the backend directory and run:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root for the backend. Configure the necessary environment variables, including the MongoDB connection URI, JWT secret, and other pertinent details.

5. Start the backend server:

   ```bash
   npm start
   ```

6. For frontend setup, navigate to the frontend directory and run:

   ```bash
   npm install
   ```

7. Start the frontend development server:
   ```bash
   npm run dev
   ```

The User Places application should now be running locally. By default, the backend should be at `http://localhost:5000` and frontend at `http://localhost:3000`.
