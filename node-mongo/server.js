const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
require('./app/models/inventory.model.js');
require('dotenv').config();
const mongoose = require('mongoose');
require('./app/routes/inventory.router.js')(app);

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', err => {
    console.log('MongoDB connection error: ' + err);
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection open');
});

const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server is running at http://${host}:${port}`);
});