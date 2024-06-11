import jwt from "jsonwebtoken";
import { ErrorWithStatus } from "./errors.utils";
import { ErrorType } from "../enums/errors";

const generateToken = (id: number) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (secret && expiresIn) {
    return jwt.sign({ id }, secret, { expiresIn });
  }
  throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
};

export default { generateToken } as const;
