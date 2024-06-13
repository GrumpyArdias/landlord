import { IReq, IRes } from "@src/types/controllers";
import { typeGuards } from "@src/utils/typeGuards.utils";
import { ILoginReq } from "@src/types/login";
import { LoginPayload } from "@src/types/auth";
import jwtUtils from "@src/utils/jwt.utils";
import { IUserReq } from "@src/types/user";
import { DBInstance } from "@src/utils/prisma.utils";
import { hashData } from "@src/utils/bycript.utils";
import { adaptUserResponse } from "@src/users/userDTF";

const prisma = DBInstance.getClient();

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
    const { email, password, username } = req.body;
    const hashedPassword = await hashData(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    return res.status(201).json(adaptUserResponse(user));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default { login, register } as const;
