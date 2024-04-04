import bcrypt from "bcryptjs";
import MongoStore from "connect-mongo";
import config from "../config/config.js";

const { compareSync, genSaltSync, hashSync } = bcrypt;

export const mongoStoreOptions = {
  store: new MongoStore({
    mongoUrl: config.MONGO_URL,
    ttl: 10,
  }),
  secret: config.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 20000,
  },
};

export const createHash = (password) => {
  const saltSync = genSaltSync(10);
  return hashSync(password, saltSync);
};

export const isValidPassword = (user, password) => {
  return compareSync(password, user.password);
};
