import type { IUserReq } from "@src/users/user.d";

const isUserReqType = (data: any): data is IUserReq => {
  if (
    data === "object" &&
    "username" in data &&
    "email" in data &&
    "password" in data
  ) {
    return true;
  } else {
    return false;
  }
};

export const typeGuards = { isUserReqType };
