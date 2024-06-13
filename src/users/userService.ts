import type { IUser, IUserReq } from "@src/types/user";
import { DBInstance } from "@src/utils/prisma.utils";
import { hashData } from "@src/utils/bycript.utils";
import { adaptUserResponse } from "@src/users/userDTF";

const prisma = DBInstance.getClient();

const getUsers = async (): Promise<Partial<IUser>[] | undefined> => {
  const users: IUser[] = await prisma.user.findMany();
  if (!users) throw new Error("No users found");
  return users.map(adaptUserResponse);
};

const getUser = async (id: number): Promise<Partial<IUser> | undefined> => {
  const user: IUser | null = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return adaptUserResponse(user);
};

const getUserByEmail = async (email: string): Promise<IUser | undefined> => {
  const user: IUser | null = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) return undefined;
  return user;
};

const createUser = async (
  user: IUserReq
): Promise<Partial<IUser> | undefined> => {
  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
  if (!newUser) throw new Error("User not created");
  return adaptUserResponse(newUser);
};

const updateUser = async (
  id: number,
  user: Partial<IUserReq>
): Promise<Partial<IUser> | undefined> => {
  const data: Partial<IUserReq> = {};
  if (user.email) data.email = user.email;
  if (user.password) data.password = await hashData(user.password);

  const updateUser: IUser = await prisma.user.update({
    where: { id },
    data,
  });

  if (!updateUser) throw new Error("User not updated");
  return adaptUserResponse(updateUser);
};

const deleteUser = async (id: number): Promise<Partial<IUser> | undefined> => {
  const hasProperties = await prisma.properties.findMany({
    where: { ownerId: id },
  });
  if (hasProperties.length > 0)
    throw new Error("User has properties associated");
  const deletedUser: IUser = await prisma.user.delete({ where: { id } });
  if (!deletedUser) throw new Error("User not deleted");
  return adaptUserResponse(deletedUser);
};

export default {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} as const;
