import { Router } from "express";
import multer from "multer";
import { CreateSpecificationController } from "../../../../modules/coffees/useCases/createSpecification/CreateSpecification.Controller";
import { ImportSpecificationsController } from "../../../../modules/coffees/useCases/importSpecifications/ImportSpecifications.Controller";
import { ListSpecificationsController } from "../../../../modules/coffees/useCases/listSpecifications/ListSpecifications.Controller";

const specificationsRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();
const importSpecificationsController = new ImportSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);
specificationsRoutes.post(
  "/import",
  upload.single("file"),
  importSpecificationsController.handle
);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
