const express = require('express');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const errorRoute = require('./middlewares/errorRoute');
const logger = require('./middlewares/logger');
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');
const applicationRouter = require('./routes/applicationRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// middleware to parse the body of incoming requests as JSON
app.use(express.json());

// middleware to parse cookies
app.use(cookieParser());

// custom logger middleware
app.use(logger);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/applications', applicationRouter);

// middleware to handle undefined routes
app.use(errorRoute);

module.exports = app;