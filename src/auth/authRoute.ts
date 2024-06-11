import { Router } from "express";
import passport from "passport";
import authController from "./authController";

const router = Router();
router.post(
  "/",
  passport.authenticate("login", {
    failureMessage: "login failed",
    session: false,
    passReqToCallback: true,
  }),
  authController.login
);

export { router as authRouter };
