import dotenv  from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "*",
    SECRET: process.env.ACCESS_TOKEN_SECRET || "secret",
}