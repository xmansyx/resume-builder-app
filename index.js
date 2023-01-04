const express = require('express');
const router = require('./Routes/router');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const app = express();


dotenv.config()
require("./config/database").connect();



// Set up middleware
app.use(express.json());

// Use the router for routes
app.use('/api', router);

// Start the server
const port = process.env.PORT || 3000;
let server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = server