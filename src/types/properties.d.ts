import type { IUser } from "./user";
export interface IProperty {
  id: number;
  adress: string;
  city: string;
  postalCode: string;
  owner: IUser;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPropertyReq extends IProperty {
  id?: number;
}
