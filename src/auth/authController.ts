import { IReq, IRes } from "@src/types/controllers";
import { typeGuards } from "@src/utils/typeGuards.utils";
import { ILoginReq } from "@src/types/login";
import { LoginPayload } from "@src/types/auth";
import jwtUtils from "@src/utils/jwt.utils";

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

export default { login } as const;
