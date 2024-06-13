import { Router } from "express";
import passport from "passport";
import authController from "./authController";

const router = Router();
router.post(
  "/login",
  passport.authenticate("login", {
    failureMessage: "login failed",
    session: false,
    passReqToCallback: true,
  }),
  authController.login
);

router.post("/signup", authController.register);

export { router as authRouter };
