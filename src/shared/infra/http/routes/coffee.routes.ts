import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCoffeeController } from "../../../../modules/coffees/useCases/createCoffee/CreateCoffee.Controller";
import { CreateCoffeeSpecificationController } from "../../../../modules/coffees/useCases/createCoffeeSpecification/CreateCoffeeSpecification.Controller";
import { ListCoffeesController } from "../../../../modules/coffees/useCases/listCoffees/ListCoffees.Controller";
import { UploadCoffeeImageController } from "../../../../modules/coffees/useCases/uploadCoffeeImage/UploadCoffeeImage.Controller";

const coffeeRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createCoffeeController = new CreateCoffeeController();
const createCoffeeSpecificationController = new CreateCoffeeSpecificationController();
const listCoffeesController = new ListCoffeesController();
const uploadCoffeeImageController = new UploadCoffeeImageController();

coffeeRoutes.post("/", createCoffeeController.handle);

coffeeRoutes.patch(
  "/image/:id",
  uploadAvatar.single("coffee"),
  uploadCoffeeImageController.handle
);

coffeeRoutes.post("/specifications/:id", createCoffeeSpecificationController.handle);

coffeeRoutes.get("/", listCoffeesController.handle);

export { coffeeRoutes };
