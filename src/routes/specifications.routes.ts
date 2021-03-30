import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

// specificationsRoutes.get("/", (req, res) => {
//   const specifications = specificationsRepository.list();

//   return res.status(200).json({ specifications });
// });

export { specificationsRoutes };
