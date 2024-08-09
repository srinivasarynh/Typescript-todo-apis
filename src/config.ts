import dotenv from "dotenv";
dotenv.config();

const config = {
    NODE_ENV: process.env.NODE_ENV || 'default',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'default',
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || 30,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || 30,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'default',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'default',
    SESSION_SECRET: process.env.SESSION_SECRET || 'default',
};

export default config;