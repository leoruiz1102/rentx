import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { routes } from "./routes/index.routes";
import swaggerFile from "./swagger.json";
import "./database";
import "./shared/container";

const app = express();
const port = 3333;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.listen(port, () => console.log(`Server started on port: ${port}`));