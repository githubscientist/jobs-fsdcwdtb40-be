const express = require('express');
const authRouter = require('./routes/authRoutes');

const app = express();

// middleware to parse the body of incoming requests as JSON
app.use(express.json());

app.use('/api/v1/auth', authRouter);

module.exports = app;