import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FASTFOOD API",
      version: "1.0.0",
      description: "API documentation for Organizations, Users, Categories, etc.",
    },
    servers: [
      {
        url: "https://fastfood-api-ifn3.onrender.com/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], 
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
