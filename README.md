
# 📚 Book Management API

A simple API for managing books, built with **NestJS**, **Prisma**, **Swagger**, and **MySQL**.

## 🛠 Features
- Create, read, update, and delete books.
- API documentation via **Swagger**.
- **Prisma ORM** integration with MySQL database.
- Unit tests with **Jest**.

## 🧰 Tech Stack
- [NestJS](https://nestjs.com/) - A progressive Node.js framework.
- [Prisma](https://www.prisma.io/) - Next-generation ORM for TypeScript and JavaScript.
- [Swagger](https://swagger.io/) - API Documentation and Testing.
- [MySQL](https://www.mysql.com/) - Relational database management system.
- [Jest](https://jestjs.io/) - JavaScript testing framework.

## 📦 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) v14.x or later
- [MySQL](https://www.mysql.com/) (Make sure your MySQL server is running)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone 
   cd book-management-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file at the root of the project and add your MySQL database connection details:
   ```bash
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"
   ```

4. Initialize Prisma:
   Run the following commands to initialize Prisma and apply migrations:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. Start the application:
   ```bash
   npm run start
   ```

6. Open your browser and visit the Swagger API documentation at:
   ```
   http://localhost:3000/swagger
   ```

## 🚀 Usage

You can use the API to perform CRUD operations on books. Here are the available endpoints:

| Method   | Endpoint           | Description              |
|----------|--------------------|--------------------------|
| `GET`    | `/books`            | Get all books            |
| `GET`    | `/books/:id`        | Get a single book by ID   |
| `POST`   | `/books`            | Create a new book        |
| `PUT`    | `/books/:id`        | Update a book by ID      |
| `DELETE` | `/books/:id`        | Delete a book by ID      |

### Example Book JSON Structure

When creating or updating a book, you need to send a JSON object in the following format:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedAt": "1925-04-10T00:00:00.000Z"
}
```

## 🧪 Running Tests

You can run unit tests with the following command:
```bash
npm run test
```

This will execute all the unit tests, including tests for your services and controllers.

## 📜 API Documentation

This project uses **Swagger** to provide a visual interface for API documentation and testing. Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3000/swagger
```

## 📝 License

This project is licensed under the MIT License.
