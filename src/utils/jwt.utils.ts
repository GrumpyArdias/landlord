import jwt from "jsonwebtoken";

const generateToken = (id: number) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (secret && expiresIn) {
    return jwt.sign({ id }, secret, { expiresIn });
  }
  throw new Error("Internal server error");
};

export default { generateToken } as const;
