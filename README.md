# Book Review API

## Project Setup Instructions

1. Clone the repository to your local machine.

2. Install dependencies:

```bash
npm install

Create a .env file in the root directory and add the following environment variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Replace your_mongodb_connection_string with your actual MongoDB connection string and your_jwt_secret with a secure secret key for JWT.

Start the server:
node server.js/ npm start ( as start is declared in package.json)

By default, the server runs on port 5000 unless otherwise specified in .env.


How to Run Locally
Run the following command after setup to start the server locally:
node server.js

You can then access the API at:
http://localhost:5000/api/


Example API Requests
User Signup

curl -X POST http://localhost:5000/api/auth/signup \
 -H "Content-Type: application/json" \
 -d '{"username": "testuser", "password": "TestPassword123"}'

User Login
curl -X POST http://localhost:5000/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"username": "testuser", "password": "TestPassword123"}'

Response contains a JWT token you need for authenticated requests.



Add a New Book (Authenticated)
curl -X POST http://localhost:5000/api/books \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <JWT_TOKEN>" \
 -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Classic"}'
Replace <JWT_TOKEN> with the token received from login.


Get All Books
curl -X GET 'http://localhost:5000/api/books?page=1&limit=10'


Get Book Details By ID
curl -X GET http://localhost:5000/api/books/<BOOK_ID>
Replace <BOOK_ID> with the book's ID.


Submit a Review (Authenticated)
curl -X POST http://localhost:5000/api/books/<BOOK_ID>/reviews \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <JWT_TOKEN>" \
 -d '{"rating": 5, "comment": "Amazing book!"}'

Update Your Review (Authenticated)
curl -X PUT http://localhost:5000/api/reviews/<REVIEW_ID> \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <JWT_TOKEN>" \
 -d '{"rating": 4, "comment": "Updated review comment"}'

Delete Your Review (Authenticated)
curl -X DELETE http://localhost:5000/api/reviews/<REVIEW_ID> \
 -H "Authorization: Bearer <JWT_TOKEN>"


Design Decisions and Assumptions
Tech Stack: Node.js with Express.js and MongoDB (using Mongoose) chosen for easy setup and schema flexibility.

Authentication: JWT-based token authentication for stateless and secure access controls.

Data Modeling:

User model includes username and hashed password (bcrypt).
Book model with title, author, genre, and references to reviews.
Review model linked to both Book and User, containing a rating and optional comment.
Authorization:

Only authenticated users can add books and submit, update, or delete their own reviews.
Validation: Required fields validated by Mongoose schema (e.g., title, author, rating).

Pagination and Filtering: Implemented on GET /books to limit results and filter by author or genre.

Error Handling: Basic error messages returned for invalid data, unauthorized access, or resource not found.

No Service Layer: All business logic is contained directly within Express controllers for simplicity.

Security:

Passwords hashed with bcrypt.
JWT secret must be securely stored in environment variables.
Authorization header format: Authorization: Bearer <token> required for protected routes.
