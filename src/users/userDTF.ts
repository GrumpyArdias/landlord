import type { IUser } from "@src/types/user";

export const adaptUserResponse = (user: IUser): Partial<IUser> => {
  const { id, username, email } = user;
  return { id, username, email };
};
