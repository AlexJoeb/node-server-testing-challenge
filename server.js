// * Express
const express = require('express');
const server = express();

// * Environment Variables
require('dotenv').config()

server.use(express.json());

// * Routes
const Users = require('./Routes/Users');
const Auth = require('./Routes/Auth');

server.use('/api/users', Users);
server.use('/auth', Auth);

const port = process.env.PORT || 5000;
const app = server.listen(port, () => console.log(`API started on port ${port}.`));

module.exports = app;