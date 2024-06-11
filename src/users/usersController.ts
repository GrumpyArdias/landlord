import userService from "./userService";
import { IUser, IUserReq } from "../types/user";
import { IReq, IRes } from "../types/controllers";
import { typeGuards } from "@src/utils/typeGuards.utils";
//TODO: Falta añadir middelware de error, types de req y res

const getUsers = async (_req: IReq<void>, res: IRes<IUser[]>) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({ payload: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUser = async (_req: IReq<void>, res: IRes<IUser>) => {
  try {
    const user = await userService.getUser(Number(req.params.id));
    return res.status(200).json({ payload: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUser = async (_req: IReq<void>, res: IRes<IUser>) => {
  try {
    const user = req.body;

    if (typeGuards.isUserReqType(user)) {
      // haspassword
      const newUser = await userService.createUser({
        ...user,
        password: user.password,
      });

      return res.status(200).json({ payload: newUser });
    } else {
      return res.status(400).json("Invalid user data");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updateUser = async (req: IReq<Partial<IUserReq>>, res: IRes<IUser>) => {
  try {
    const user = req.body;
    if (user.email || user.password) {
      const updatedUser = await userService.updateUser(
        Number(req.params.id),
        user
      );
      return res.status(200).json(updatedUser);
    } else {
      return res
        .status(400)
        .json("You must provide at least one field to update");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req: IReq<void>, res: IRes<IUser>) => {
  try {
    const user = await userService.deleteUser(Number(req.params.id));
    return res.status(200).json({ payload: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} as const;
