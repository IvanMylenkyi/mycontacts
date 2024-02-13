# Web Application README
### Description
This web application provides functionality for user registration, login, and management of contacts. Users can register an account, log in securely, and perform CRUD operations on their contacts.

### Features
- User Registration: Users can sign up for an account.
- User Login: Registered users can securely log in to their accounts.
- Contact Management: Users can add, delete, and edit their contacts.
- Secure Authentication: Authentication is handled using JWT (JSON Web Tokens) for secure user sessions.
### Tools Used
- Node.js: JavaScript runtime environment.
- Express.js: Web application framework for Node.js.
- JWT (JSON Web Tokens): Authentication mechanism for secure user sessions.
### Installation
- Clone the repository: git clone <repository-url>
- Navigate to the project directory: cd <project-directory>
- Install dependencies: npm install
### Usage
- Start the server: npm start
- Access the application through a web browser or Thunder Client.
- Register a new account or log in with existing credentials.
- Manage contacts by adding, deleting, or editing them.
### API Endpoints
- POST /register: Register a new user.
- POST /login: Log in with existing credentials.
- GET /contacts: Get all contacts for the logged-in user.
- POST /contacts: Add a new contact.
- PUT /contacts/:id: Update an existing contact.
- DELETE /contacts/:id: Delete a contact by ID.
### Testing
- Use Thunder Client or any API testing tool to send requests to the API endpoints.
- Test user registration, login, and contact management functionalities.
### Contributors
Mylenkyi Ivan
### License:
This project is licensed under the MIT License.





