import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import { throwError } from '../helpers/ErrorHandler.helper';
import { User } from '../models/User.model';
import { DatabaseUserInterface, UserInterface } from '../types/api/user';

const LocalStrategy = passportLocal.Strategy;

const getUserInfo = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isAdmin: user.is_admin,
    isVerified: user.is_verified,
  };
};

const validateUser = async (email: string, password: string, done) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      done(null, false);
      return;
    }
    bcrypt.compare(password, user.password, (err, result: boolean) => {
      if (err) throw err;
      if (!result) done(null, false);
      done(null, user);
    });
  } catch (err) {
    console.error(err);
    throwError(400, err.message);
  }
};

const strategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  validateUser,
);

passport.use(strategy);
//passport serialize
passport.serializeUser((user: DatabaseUserInterface, done) => {
  done(null, user.id);
});

//passport deserialize
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    const userInfo: UserInterface = getUserInfo(user);
    done(null, userInfo);
  } catch (err) {
    done(err);
  }
});

export default passport;
