require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal';
const PORT = process.env.PORT || 5001;
const EMAIL_USER = process.env.EMAIL_USER;
const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || 'apple';
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    MONGODB_URI,
    PORT,
    EMAIL_USER,
    GOOGLE_APP_PASSWORD,
    JWT_SECRET,
    NODE_ENV
}