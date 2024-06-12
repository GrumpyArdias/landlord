import type { IProperty, IPropertyReq } from "@src/types/properties";
import { DBInstance } from "@src/utils/prisma.utils";

const prisma = DBInstance.getClient();

const getProperties = async (): Promise<IProperty[]> => {
  const properties: IProperty[] = await prisma.properties.findMany();
  if (!properties) throw new Error("No properties found");
  return properties;
};

const getProperty = async (id: number): Promise<IProperty> => {
  const property: IProperty | null = await prisma.properties.findUnique({
    where: { id },
  });
  if (!property) throw new Error("Property not found");
  return property;
};

const createProperty = async (property: IProperty): Promise<IProperty> => {
  const newProperty = await prisma.properties.create({
    data: {
      address: property.address,
      city: property.city,
      postalCode: property.postalCode,
    },
  });
  if (!newProperty) throw new Error("Property not created");
  return newProperty;
};

const updateProperty = async (
  id: number,
  property: Partial<IPropertyReq>
): Promise<IProperty> => {
  const data: Partial<IPropertyReq> = {};
  if (property.address) data.address = property.address;
  if (property.city) data.city = property.city;
  if (property.postalCode) data.postalCode = property.postalCode;
  const updatedProperty: IProperty = await prisma.properties.update({
    where: { id },
    data,
  });
  if (!updatedProperty) throw new Error("Property not updated");
  return updatedProperty;
};

const deleteProperty = async (id: number): Promise<IProperty> => {
  const deletedProperty: IProperty = await prisma.properties.delete({
    where: { id },
  });
  if (!deletedProperty) throw new Error("Property not deleted");
  return deletedProperty;
};

export default {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} as const;
