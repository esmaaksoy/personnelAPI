## Personnel Api

This repository contains the backend code for a personnel management application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows for the management of departments and personnel within an organization.

### Functionality

- **Authentication:**
    The application supports user authentication with username and password. Upon successful authentication, a JWT (JSON Web Token) is generated and provided to the user for subsequent API requests.
- **Department Management:**
    Departments can be listed, created, read, updated, and deleted through the provided API endpoints. Only authenticated users with admin privileges have access to these functionalities.
- **Personnel Management**
    Personnel information can be managed through the provided API endpoints. CRUD (Create, Read, Update, Delete) operations are supported for personnel records. Permissions are implemented to ensure that only authorized users can perform these operations.

## Project Skeleton



```
Personnel Api/
  ├── index.js          // Express.js server setup
  ├── .env
  ├── logs
  ├── src
      ┣ configs
      ┃ ┗ dbConnection.js
      ┣ controllers
      ┃ ┣ auth.controller.js
      ┃ ┣ department.controller.js
      ┃ ┣ token.controller.js
      ┃ ┗ personnel.controller.js
      ┣ helpers
      ┃ ┣ sync.js
      ┃ ┗ paswordEncrypte.js
      ┣ middlewares
      ┃ ┣ authentication.js
      ┃ ┣ errorHandler.js
      ┃ ┣ logging.js
      ┃ ┣ permissions.js
      ┃ ┗ queryHandler.js
      ┣ models
      ┃ ┣ department.model.js
      ┃ ┣ token.model.js
      ┃ ┗ personnel.model.js
      ┣ routes
      ┃ ┣ auth.router.js
      ┃ ┣ department.router.js
      ┃ ┣ personnel.router.js
      ┃ ┣ token.router.js
      ┃ ┗ index.js
      
  ├── package.json    // Node.js project configuration
  └── README.md       // Project documentation
```
## Tech/framework used
- **Express.js:** Fast and flexible Node.js web application framework.
- **MongoDB:** Flexible and scalable NoSQL database solution.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **Logging:** Logging functionality is integrated to track application activities and errors.
- **Swagger/Redoc:** Documentation is generated using Swagger or Redoc to provide API documentation in an interactive and user-friendly manner.
- **JSON File Creation:** JSON files are created to store data or configurations for various purposes.
- **Token-based Authentication:** Token-based authentication mechanism is implemented to ensure secure communication between client and server, enhancing overall application security and user authentication.
- **Dotenv:** Node.js module used for loading environment variables.
- **Express-async-errors:** Helper module for asynchronous error handling in Express applications.
- **CRUD Operations** Users can create, read, update, and delete books from the database.
- **Middleware** Middleware functions are implemented to handle requests, perform validations, and enhance security.

## Project ERD

![erd](./erdPersonnelAPI.png)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/esmaaksoy/personnelAPI
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create .env file in home directory.
   ```sh
   HOST=localhost
   PORT=8000
   MONGODB=ENTER YOUR Database adres or local: mongodb://127.0.0.1:27017/personnelAPI
   SECRET_KEY=ENTER YOUR random letters and number, for example: jsl78dd9ff6f6s9jkd89Kkfnfd

   ```
4. Logs File
   ```sh
   You can write:
   mkdir logs
   ```
 5. The project is ready, you can start using it now.
   ```sh
   You can run:
   nodemon
   ```



