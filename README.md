
# Student Management System

A student management system built using Node.js, Express, TypeScript, 
and MongoDB (Mongoose)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rahiii-dev/student-management
   ```

2. Navigate into the project directory:

   ```bash
   cd student-management/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```bash
   touch .env
   ```

   Check `.env-example` folder:


5. Build the project:

   ```bash
   npm run build
   ```

## Usage

To start the development server, run:

```bash
npm run dev
```

This will use `nodemon` to automatically restart the server when you make changes.

For production build:

```bash
npm run build
npm start
```

## Scripts

- `npm run start` - Start the production server.
- `npm run dev` - Start the development server with `nodemon`.
- `npm run build` - Compile TypeScript to JavaScript using the TypeScript compiler.
- `npm run format` - Format code with Prettier.

## Technologies Used

- **Node.js** - JavaScript runtime for server-side development.
- **Express** - Web framework for building the API.
- **TypeScript** - Typed JavaScript for better code quality.
- **Mongoose** - MongoDB object modeling tool.
- **JWT** - JSON Web Token for user authentication.
- **bcryptjs** - Password hashing and verification.
- **Nodemon** - Automatically restarts the node application when file changes are detected during development.
- **Prettier** - Code formatting tool.

## License

This project is licensed under the MIT License.
