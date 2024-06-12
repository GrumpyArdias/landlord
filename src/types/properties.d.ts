import type { IUser } from "./user";
export interface IProperty {
  id: number;
  address: string;
  city: string;
  postalcode: string;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPropertyReq extends IProperty {
  id?: number;
}
