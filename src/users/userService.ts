import type { IUser, IUserReq } from "@src/types/user";
import { DBInstance } from "@src/utils/prisma.utils";
import { hashData } from "@src/utils/bycript.utils";

const prisma = DBInstance.getClient();

const getUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await prisma.user.findMany();
  if (!users) throw new Error("No users found");
  return users;
};

const getUser = async (id: number): Promise<IUser> => {
  const user: IUser | null = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return user;
};

const createUser = async (user: IUserReq): Promise<IUser | null> => {
  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
  if (!newUser) throw new Error("User not created");
  return newUser;
};

const updateUser = async (
  id: number,
  user: Partial<IUserReq>
): Promise<IUser> => {
  const data: Partial<IUserReq> = {};
  if (user.email) data.email = user.email;
  if (user.password) data.password = await hashData(user.password);

  const updateUser: IUser = await prisma.user.update({
    where: { id },
    data,
  });

  if (!updateUser) throw new Error("User not updated");
  return updateUser;
};

const deleteUser = async (id: number) => {
  const deletedUser: IUser = await prisma.user.delete({ where: { id } });
  if (!deletedUser) throw new Error("User not deleted");
  return deletedUser;
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} as const;
