import { Router } from "express";
import { CreatePurchaseController } from "../../../../modules/purchases/useCases/createPurchase/CreatePurchase.Controller";
import { ListPurchaseController } from "../../../../modules/purchases/useCases/listPurchase/ListPurchase.Controller";
import { ListPurchasesController } from "../../../../modules/purchases/useCases/listPurchases/ListPurchases.Controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const purchaseRoutes = Router();

const createPurchaseController = new CreatePurchaseController();
const listPurchasesController = new ListPurchasesController();
const listPurchaseController = new ListPurchaseController();

purchaseRoutes.post("/", ensureAuthenticated, createPurchaseController.handle);
purchaseRoutes.get("/", ensureAuthenticated, listPurchasesController.handle);

purchaseRoutes.get("/:id", ensureAuthenticated, listPurchaseController.handle);

export { purchaseRoutes };
