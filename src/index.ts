import express from "express";
import cors from "cors";
//ROUTES
import { usersRouter } from "./users/usersRoute";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/users", usersRouter);
