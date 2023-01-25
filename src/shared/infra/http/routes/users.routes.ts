import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ConfirmMailController } from "../../../../modules/accounts/useCases/confirmMail/ConfirmMail.Controller";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/createUser.controller";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUser.Controller";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatar.Controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();
const confirmMailController = new ConfirmMailController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/confirmation/:token", confirmMailController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
