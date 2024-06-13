import { IReq, IRes } from "@src/types/controllers";
import { typeGuards } from "@src/utils/typeGuards.utils";
import { ILoginReq } from "@src/types/login";
import { LoginPayload } from "@src/types/auth";
import jwtUtils from "@src/utils/jwt.utils";
import { IUserReq } from "@src/types/user";
import { hashData } from "@src/utils/bycript.utils";
import userService from "@src/users/userService";

const login = async (req: IReq<ILoginReq>, res: IRes<LoginPayload>) => {
  try {
    const user = req.user;

    if (typeGuards.isUserReqType(user) && user.id) {
      const accessToken = await jwtUtils.generateToken(user.id);
      return res.status(200).json({ accessToken });
    } else {
      console.error("Invalid credentials. Please check and try again.");
      return res.status(401).json({
        error: "Invalid credentials. Please check and try again.",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while logging in" });
  }
};

const register = async (req: IReq<IUserReq>, res: IRes<IUserReq>) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      username: req.body.username,
      password: await hashData(req.body.password),
    });

    if (!user) throw new Error("User not created");
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export default { login, register } as const;
