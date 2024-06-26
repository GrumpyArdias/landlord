import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import "./middleware/passport.middleware";
import { usersRouter } from "./users/usersRoute";
import { authRouter } from "./auth/authRoute";
import { propertiesRouter } from "./properties/propertiesRoute";
import { isAuth } from "./middleware/auth.middleware";
import { swaggerUi, swaggerSpecs } from "./utils/swagger.utils";
import { authErrorHandler } from "./utils/errors.utils";

const app = express();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable not set");
}

app.use(
  session({
    secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: process.env.COOKIE_MAX_AGE
        ? parseInt(process.env.COOKIE_MAX_AGE)
        : 3600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

//ROUTER
app.use("/auth", authRouter);
app.use("/api/users", isAuth, usersRouter);
app.use("/api/properties", isAuth, propertiesRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(authErrorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
