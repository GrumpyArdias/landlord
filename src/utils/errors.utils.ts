import type {
  ErrorCollection,
  ErrorConfig,
  ErrorData,
  ErrorDescription,
} from "../types/errors";
import { ErrorType } from "../enums/errors";
import { HttpStatusCode } from "../enums/resStatus";
import { Request, Response, NextFunction } from "express";

export class ErrorWithStatus extends Error {
  public readonly status: number;
  public readonly description?: ErrorDescription;
  constructor(errorType: ErrorType, config?: ErrorConfig) {
    super(errorData[errorType].message);
    this.status = errorData[errorType].status;
    if (config?.alternativeMessage) {
      this.message = config.alternativeMessage;
    }
    if (config?.description) {
      this.description = config.description;
    }
  }
}

export const createErrorDescription = (
  errorObject: string,
  errors: ErrorCollection[]
): ErrorDescription => {
  return {
    "error in": errorObject,
    errors,
  };
};

const errorData: ErrorData = {
  [ErrorType.BAD_REQUEST]: {
    status: HttpStatusCode.BAD_REQUEST,
    message: "Bad request",
  },
  [ErrorType.UNAUTHORIZED]: {
    status: HttpStatusCode.UNAUTHORIZED,
    message: "Unauthorized to get access to this endpoint",
  },
  [ErrorType.UNAUTHENTICATED]: {
    status: HttpStatusCode.UNAUTHORIZED,
    message: "Unauthenticated",
  },
  [ErrorType.FORBIDDEN]: {
    status: HttpStatusCode.FORBIDDEN,
    message: "You do not have permission to this resource",
  },
  [ErrorType.NOT_FOUND]: {
    status: HttpStatusCode.NOT_FOUND,
    message: "Resource not found",
  },
  [ErrorType.INTERNAL_SERVER_ERROR]: {
    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
  },
};

export const authErrorHandler = (
  err: {
    name: string;
  },
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "AuthenticationError") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next(err);
  return;
};
