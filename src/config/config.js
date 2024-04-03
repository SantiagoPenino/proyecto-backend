import "dotenv/config";

export default {
  PORT: process.env.PORT,
  ENV: process.env.ENV,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  SESSION_KEY: process.env.SESSION_KEY,
  PERSISTENCE: process.env.PERSISTENCE,
  SECRET_COOKIES: process.env.SECRET_COOKIES,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
};
