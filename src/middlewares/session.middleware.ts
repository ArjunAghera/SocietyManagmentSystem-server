import session from 'express-session';
import * as dotenv from 'dotenv';

dotenv.config();

const sessionMiddleware = session({
  secret: `${process.env.SESSIONSECRET}`,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 /* 24 hours */,
    secure: false,
  },
});

export default sessionMiddleware;
