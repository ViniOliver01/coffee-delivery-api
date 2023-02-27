import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCoffeeController } from "../../../../modules/coffees/useCases/createCoffee/CreateCoffee.Controller";
import { CreateCoffeeSpecificationController } from "../../../../modules/coffees/useCases/createCoffeeSpecification/CreateCoffeeSpecification.Controller";
import { DeleteCoffeeController } from "../../../../modules/coffees/useCases/deleteCoffee/DeleteCoffee.Controller";
import { ImportCoffeesController } from "../../../../modules/coffees/useCases/importCoffees/ImportCoffees.Controller";
import { ListCoffeesController } from "../../../../modules/coffees/useCases/listCoffees/ListCoffees.Controller";
import { UpdateCoffeeDataController } from "../../../../modules/coffees/useCases/UpdateCoffeeData/UpdateCoffeeData.Controller";
import { UploadCoffeeImageController } from "../../../../modules/coffees/useCases/uploadCoffeeImage/UploadCoffeeImage.Controller";

const coffeeRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const upload = multer({
  dest: "./tmp",
});

const createCoffeeController = new CreateCoffeeController();
const createCoffeeSpecificationController = new CreateCoffeeSpecificationController();
const listCoffeesController = new ListCoffeesController();
const uploadCoffeeImageController = new UploadCoffeeImageController();
const importCoffeesController = new ImportCoffeesController();
const updateCoffeeDataController = new UpdateCoffeeDataController();
const deleteCoffeeController = new DeleteCoffeeController();

coffeeRoutes.post("/", createCoffeeController.handle);

coffeeRoutes.post(
  "/import",
  upload.single("file"),
  // ensureAuthenticated,
  // ensureAdmin,
  importCoffeesController.handle
);

coffeeRoutes.patch(
  "/image/:id",
  uploadAvatar.single("coffee"),
  uploadCoffeeImageController.handle
);

coffeeRoutes.patch("/update", updateCoffeeDataController.handle);

coffeeRoutes.post("/specifications", createCoffeeSpecificationController.handle);

coffeeRoutes.get("/", listCoffeesController.handle);

coffeeRoutes.delete("/:id", deleteCoffeeController.handle);

export { coffeeRoutes };
