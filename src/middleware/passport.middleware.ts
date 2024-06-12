import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import userService from "../users/userService";
import { IUser } from "../types/user";
import { ErrorType } from "../enums/errors";
import { ErrorWithStatus } from "../utils/errors.utils";
import { compareHashedData } from "../utils/bycript.utils";
import type { JWTPayload } from "../types/auth";

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userService.getUserByEmail(email);
        const loginError = new ErrorWithStatus(ErrorType.UNAUTHORIZED, {
          alternativeMessage: "Incorrect email or password",
        });

        if (!user) {
          return done(loginError, false, {
            message: "Incorrect email or password",
          });
        }

        const isMatch = await compareHashedData(password, user.password);

        if (!isMatch) {
          return done(loginError, false, {
            message: "Incorrect email or password",
          });
        }

        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.use(
  "jwtAuth",
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload: JWTPayload, done) => {
      try {
        const user = await userService.getUser(payload.id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (serUser: IUser, done) => {
  if (serUser.id) {
    const user = await userService.getUser(serUser.id);
    done(null, user);
  }
});
