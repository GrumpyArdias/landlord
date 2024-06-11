import { Nullable } from "./generals";

export type ErrorData = {
  [key: string]: {
    status: number;
    message: string;
  };
};

export type ErrorConfig = {
  alternativeMessage?: Nullable<string>;
  description?: ErrorDescription;
};

export type ErrorDescription = {
  "error in": string;
  errors: ErrorCollection[];
};

export type ValitionType = {
  IsRequired: string;
  MustBeType: (data: string) => string;
  Must: (data: string) => string;
};

export type ErrorCollection = {
  field: string;
  validation: string;
};
