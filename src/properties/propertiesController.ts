import propertiesService from "./propertiesService";
import { IProperty, IPropertyReq } from "../types/properties";
import { IReq, IRes } from "../types/controllers";
import { typeGuards } from "@src/utils/typeGuards.utils";
import { ErrorType } from "@src/enums/errors";
import { ErrorWithStatus } from "@src/utils/errors.utils";
import { IUser } from "@src/types/user";

const getProperties = async (req: IReq<void>, res: IRes<IProperty[]>) => {
  try {
    if (!req.user) throw new ErrorWithStatus(ErrorType.UNAUTHORIZED);
    const properties = await propertiesService.getProperties(
      Number((req.user as IUser).id)
    );
    return res.status(200).json({ payload: properties });
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
  }
};

const getProperty = async (req: IReq<void>, res: IRes<IProperty>) => {
  try {
    if (!req.user) throw new ErrorWithStatus(ErrorType.UNAUTHORIZED);
    const property = await propertiesService.getProperty(
      Number((req.user as IUser).id),
      Number(req.params.id)
    );
    return res.status(200).json({ payload: property });
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
  }
};

const createProperty = async (
  req: IReq<IPropertyReq>,
  res: IRes<IProperty>
) => {
  try {
    const property = req.body;
    if (typeGuards.isPropertyReqType(property)) {
      if (!req.user) throw new ErrorWithStatus(ErrorType.UNAUTHORIZED);
      const newProperty = await propertiesService.createProperty(
        Number((req.user as IUser).id),
        property
      );
      return res.status(200).json({ payload: newProperty });
    } else {
      return res.status(400).json("Invalid property data");
    }
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
  }
};

const updateProperty = async (
  req: IReq<Partial<IPropertyReq>>,
  res: IRes<IProperty>
) => {
  try {
    const property = req.body;
    if (property.address || property.city || property.postalcode) {
      if (!req.user) throw new ErrorWithStatus(ErrorType.UNAUTHORIZED);
      const updatedProperty = await propertiesService.updateProperty(
        Number((req.user as IUser).id),
        Number(req.params.id),
        property
      );
      return res.status(200).json({ payload: updatedProperty });
    } else {
      return res.status(400).json("Invalid property data");
    }
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
  }
};

const deleteProperty = async (req: IReq<void>, res: IRes<IProperty>) => {
  try {
    if (!req.user) throw new ErrorWithStatus(ErrorType.UNAUTHORIZED);
    const property = await propertiesService.deleteProperty(
      Number((req.user as IUser).id),
      Number(req.params.id)
    );
    return res.status(200).json({ payload: property });
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    } else {
      throw new ErrorWithStatus(ErrorType.INTERNAL_SERVER_ERROR);
    }
  }
};

export default {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} as const;
