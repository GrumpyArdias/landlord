import propertiesService from "./propertiesService";
import { IProperty, IPropertyReq } from "../types/properties";
import { IReq, IRes } from "../types/controllers";
import { typeGuards } from "@src/utils/typeGuards.utils";
import { IUser } from "@src/types/user";

const getProperties = async (req: IReq<void>, res: IRes<IProperty[]>) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    const properties = await propertiesService.getProperties(
      Number((req.user as IUser).id)
    );
    return res.status(200).json({ payload: properties });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the properties." });
  }
};

const getProperty = async (req: IReq<void>, res: IRes<IProperty>) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    const property = await propertiesService.getProperty(
      Number((req.user as IUser).id),
      Number(req.params.id)
    );
    return res.status(200).json({ payload: property });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the property." });
  }
};

const searchProperties = async (req: IReq<void>, res: IRes<IProperty[]>) => {
  try {
    const query = req.query;

    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const properties = await propertiesService.searchProperties(
      Number((req.user as IUser).id),
      query
    );

    return res.status(200).json({ payload: properties });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while searching" });
  }
};
const createProperty = async (
  req: IReq<IPropertyReq>,
  res: IRes<IProperty>
) => {
  try {
    const property = req.body;
    if (typeGuards.isPropertyReqType(property)) {
      if (!req.user)
        return res.status(401).json({ error: "Not authenticated" });
      const newProperty = await propertiesService.createProperty(
        Number((req.user as IUser).id),
        property
      );
      return res.status(200).json({ payload: newProperty });
    } else {
      return res.status(400).json("Invalid property data");
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the property." });
  }
};

const updateProperty = async (
  req: IReq<Partial<IPropertyReq>>,
  res: IRes<IProperty>
) => {
  try {
    const property = req.body;
    if (property.address || property.city || property.postalcode) {
      if (!req.user)
        return res.status(401).json({ error: "Not authenticated" });
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
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the property." });
  }
};

const deleteProperty = async (req: IReq<void>, res: IRes<IProperty>) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    const property = await propertiesService.deleteProperty(
      Number((req.user as IUser).id),
      Number(req.params.id)
    );
    return res.status(200).json({ payload: property });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the property." });
  }
};

export default {
  getProperties,
  getProperty,
  searchProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} as const;
