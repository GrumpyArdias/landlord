export const enum ErrorType {
  BAD_REQUEST = "badRequest",
  UNAUTHORIZED = "unauthorized",
  UNAUTHENTICATED = "unauthenticated",
  FORBIDDEN = "frobidden",
  NOT_FOUND = "notFound",
  INTERNAL_SERVER_ERROR = "internalServerError",
}

export const enum UserErrorType {
  TypeGuard = "typeGuard",
  FieldValidation = "fieldValidation",
}
