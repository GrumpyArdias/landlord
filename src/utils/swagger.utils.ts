import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Landlord API",
      version: "1.0.0",
      description: "A RESTful API for Landlords",
    },
  },
  apis: ["./src/docs/*.yaml"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerSpecs };
