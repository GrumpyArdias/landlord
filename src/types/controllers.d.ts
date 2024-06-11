import * as e from "express";
import { Send } from "express-serve-static-core";
export interface IReq<T>
  extends e.Request<T, unknown, unknown, { [key: string]: string }> {
  body: T;
  params: {
    id: string;
  };
}

export interface IRes<T> extends e.Response {
  json: Send<CuestomResponse<T>, this>;
}
