import { Router } from "express";
import multer from "multer";
import { CreateSpecificationController } from "../../../../modules/coffees/useCases/createSpecification/CreateSpecification.Controller";
import { DeleteSpecificationController } from "../../../../modules/coffees/useCases/deleteSpecification/DeleteSpecification.Controller";
import { ImportSpecificationsController } from "../../../../modules/coffees/useCases/importSpecifications/ImportSpecifications.Controller";
import { ListSpecificationsController } from "../../../../modules/coffees/useCases/listSpecifications/ListSpecifications.Controller";
import { UpdateSpecificationController } from "../../../../modules/coffees/useCases/updateSpecification/UpdateSpecification.Controller";

const specificationsRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();
const importSpecificationsController = new ImportSpecificationsController();
const updateSpecificationController = new UpdateSpecificationController();
const deleteSpecificationController = new DeleteSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);
specificationsRoutes.post(
  "/import",
  upload.single("file"),
  importSpecificationsController.handle
);

specificationsRoutes.patch("/update", updateSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationController.handle);

specificationsRoutes.delete("/:id", deleteSpecificationController.handle);

export { specificationsRoutes };
