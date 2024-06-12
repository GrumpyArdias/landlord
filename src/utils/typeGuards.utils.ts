import type { IUserReq } from "@src/types/user";
import type { IPropertyReq } from "@src/types/properties";

const isUserReqType = (data: any): data is IUserReq => {
  if (
    typeof data === "object" &&
    "username" in data &&
    "email" in data &&
    "password" in data
  ) {
    return true;
  } else {
    return false;
  }
};

const isUserTokenType = (data: unknown): data is IUserReq => {
  if (data && typeof data === "object" && "id" in data) {
    return true;
  } else {
    return false;
  }
};

const isPropertyReqType = (data: any): data is IPropertyReq => {
  if (
    typeof data === "object" &&
    "adress" in data &&
    "city" in data &&
    "postalCode" in data
  ) {
    return true;
  } else {
    return false;
  }
};

export const typeGuards = { isUserReqType, isUserTokenType, isPropertyReqType };
