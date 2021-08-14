import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";
import { enshureAuthneticated } from "../middlewares/enshureAuthenticated";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  enshureAuthneticated,
  createSpecificationController.handle,
);

// specificationsRoutes.get("/", (req, res) => {
//   const specifications = specificationsRepository.list();

//   return res.status(200).json({ specifications });
// });

export { specificationsRoutes };
