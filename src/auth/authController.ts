import { IReq, IRes } from "@src/types/controllers";
import { ErrorWithStatus } from "@src/utils/errors.utils";
import { typeGuards } from "@src/utils/typeGuards.utils";
import { ILoginReq } from "@src/types/login";
import { LoginPayload } from "@src/types/auth";
import jwtUtils from "@src/utils/jwt.utils";
import { ErrorType } from "@src/enums/errors";

const login = async (req: IReq<ILoginReq>, res: IRes<LoginPayload>) => {
  try {
    const user = req.user;
    if (typeGuards.isUserReqType(user) && user.id) {
      const accessToken = await jwtUtils.generateToken(user.id);
      return res.status(200).json({ accessToken });
    } else {
      throw new ErrorWithStatus(ErrorType.NOT_FOUND);
    }
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
  }
};

export default { login } as const;
