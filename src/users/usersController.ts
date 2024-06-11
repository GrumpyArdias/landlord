import userService from "./userService";
import { IUser, IUserReq } from "../types/user";
import { IReq, IRes } from "../types/controllers";
import { typeGuards } from "@src/utils/typeGuards.utils";
import { ErrorType } from "@src/enums/errors";
import { ErrorWithStatus } from "@src/utils/errors.utils";
import { hashData } from "@src/utils/bycript.utils";

const getUsers = async (_req: IReq<void>, res: IRes<IUser[]>) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({ payload: users });
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
  }
};

const getUser = async (req: IReq<void>, res: IRes<IUser>) => {
  try {
    const user = await userService.getUser(Number(req.params.id));
    return res.status(200).json({ payload: user });
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
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
      return res.status(400).json("Invalid user data");
    }
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
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
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
  }
};

const deleteUser = async (req: IReq<void>, res: IRes<IUser>) => {
  try {
    const user = await userService.deleteUser(Number(req.params.id));
    return res.status(200).json({ payload: user });
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
  }
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} as const;
