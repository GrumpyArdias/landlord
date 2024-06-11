import bcrypt from "bcryptjs";

const SALT = process.env.HASH_SALT_OR_ROUND;

export const hashData = async (data: string): Promise<string> => {
  if (!SALT) {
    throw new Error(
      "HASH_SALT_OR_ROUND is not defined in the environment variables"
    );
  }
  const salt = await bcrypt.genSalt(Number(SALT));
  return bcrypt.hash(data, salt);
};

export const compareHashedData = (
  data: string,
  hashedData: string
): Promise<boolean> => bcrypt.compare(data, hashedData);
