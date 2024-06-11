import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate("jwtAuth", {
    session: false,
    passReqToCallback: true,
    failWithError: true,
  })(req, res, next);
};
