import type { IProperty, IPropertyReq } from "@src/types/properties";
import { DBInstance } from "@src/utils/prisma.utils";

const prisma = DBInstance.getClient();

const getProperties = async (ownerId: number): Promise<IProperty[]> => {
  const properties: IProperty[] = await prisma.properties.findMany({
    where: {
      ownerId: ownerId,
    },
  });
  if (!properties) throw new Error("No properties found");
  return properties;
};

const getProperty = async (ownerId: number, id: number): Promise<IProperty> => {
  const property: IProperty | null = await prisma.properties.findUnique({
    where: { ownerId: ownerId, id },
  });
  if (!property) throw new Error("Property not found");
  return property;
};

const searchProperties = async (
  ownerId: number,
  query: { [key: string]: any }
): Promise<IProperty[]> => {
  const whereClause: { [key: string]: any } = {};

  if (query.address) {
    whereClause.address = query.address;
  }
  if (query.postalcode) {
    whereClause.postalcode = query.postalcode;
  }
  if (query.city) {
    whereClause.city = query.city;
  }

  const properties: IProperty[] = await prisma.properties.findMany({
    where: {
      ownerId: ownerId,
      ...whereClause,
    },
  });

  return properties;
};

const createProperty = async (
  ownerId: number,
  property: IPropertyReq
): Promise<IProperty> => {
  const newProperty = await prisma.properties.create({
    data: {
      ownerId: ownerId,
      address: property.address,
      city: property.city,
      postalcode: property.postalcode,
    },
  });
  if (!newProperty) throw new Error("Property not created");
  return newProperty;
};

const updateProperty = async (
  ownerId: number,
  id: number,
  property: Partial<IPropertyReq>
): Promise<IProperty> => {
  const data: Partial<IPropertyReq> = {};
  if (property.address) data.address = property.address;
  if (property.city) data.city = property.city;
  if (property.postalcode) data.postalcode = property.postalcode;
  const updatedProperty: IProperty = await prisma.properties.update({
    where: { ownerId: ownerId, id },
    data,
  });
  if (!updatedProperty) throw new Error("Property not updated");
  return updatedProperty;
};

const deleteProperty = async (
  ownerId: number,
  id: number
): Promise<IProperty> => {
  const deletedProperty: IProperty = await prisma.properties.delete({
    where: { ownerId: ownerId, id },
  });
  if (!deletedProperty) throw new Error("Property not deleted");
  return deletedProperty;
};

export default {
  getProperties,
  getProperty,
  searchProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} as const;
