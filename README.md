# Daily Manager - Backend
## An application to help you managing your day

## Motivation
This is the backend for the Daily Manager application. It was built using ExpressJs and Sequelize ORM to connect to a MySQL database.

## Features
- Register/Login/Logout from user account
- Create/Read/Update/Delete operations on tasks
- Create/Read/Update/Delete operations on contacts
- Create/Read/Update/Delete operations on chronometers
- Create/Read on account

## Installation

This application requires [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) to run.

Download or clone the project on your machine, install the dependencies and start the server.

```sh
cd project_folder
npm install
```

## Usage
In order to use this api you need to create in the root of the project a .env file with the following configuration. (Note: this application is configured to run with a MySQL database).

```sh
PORT=PORT_APP_RUN (By default 3002)
DB_HOST=YOUR_DB_HOST
DB=YOUR_DB_NAME
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
DB_PORT=YOUR_DB_PORT
DB_DIALECT=mysql
TOKEN_SECRET=hsahi6378aHKHHOGAS678a6sg7G8
TOKEN_EXPIRATION=1h
```

Then you need to create the database tables with the following command.
```sh
cd project_folder
npx sequelize db:migrate
```
You will also need to create two folders in the root of the project.
```sh
cd project_folder
mkdir uploads
cd uploads
mkdir images
```

### Development

```sh
cd project_folder
npm run dev
```

By default the application will run on [http://localhost:3002](http://localhost:3002).
