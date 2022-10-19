const express = require('express');
const cors = require('cors');
const tourRouter = require('./routes/tour.route');
require("dotenv").config();

// middleware
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/tours", tourRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        'status': 'success',
        'message': 'index api'
    });
});
app.all('*', (req, res) => {
    res.status(404).json({
        'status': 'failed',
        'message': 'api not found',
    });
});

module.exports = app;