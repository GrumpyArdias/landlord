import userService from "./userService";
import { IUser, IUserReq } from "../types/user";
import { IReq, IRes } from "../types/controllers";
import { typeGuards } from "@src/utils/typeGuards.utils";
import { hashData } from "@src/utils/bycript.utils";

const getUsers = async (_req: IReq<void>, res: IRes<IUser[]>) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({ payload: users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the users." });
  }
};

const getUser = async (req: IReq<void>, res: IRes<IUser>) => {
  try {
    const user = await userService.getUser(Number(req.params.id));
    return res.status(200).json({ payload: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};

const createUser = async (req: IReq<IUserReq>, res: IRes<IUser>) => {
  try {
    const user = req.body;

    if (typeGuards.isUserReqType(user)) {
      const hashedPassword = await hashData(user.password);
      const newUser = await userService.createUser({
        ...user,
        password: hashedPassword,
      });

      return res.status(200).json({ payload: newUser });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};
const updateUser = async (req: IReq<Partial<IUserReq>>, res: IRes<IUser>) => {
  try {
    const userUpdates = req.body;
    if (userUpdates.email || userUpdates.password) {
      const updatedUser = await userService.updateUser(
        Number(req.params.id),
        userUpdates
      );
      return res.status(200).json(updatedUser);
    } else {
      return res
        .status(400)
        .json({ error: "You must provide at least one field to update" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};
const deleteUser = async (req: IReq<void>, res: IRes<IUser>) => {
  try {
    const user = await userService.deleteUser(Number(req.params.id));
    return res.status(200).json({ payload: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} as const;
