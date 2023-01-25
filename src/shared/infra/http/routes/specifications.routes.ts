import { Router } from "express";
import { CreateSpecificationController } from "../../../../modules/coffees/useCases/createSpecification/CreateSpecification.Controller";
import { ListSpecificationsController } from "../../../../modules/coffees/useCases/listSpecifications/ListSpecifications.Controller";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);
specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
