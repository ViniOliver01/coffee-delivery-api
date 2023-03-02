import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ChangePasswordUserController } from "../../../../modules/accounts/useCases/changePasswordUser/ChangePasswordUser.controller";
import { CheckIsAdminController } from "../../../../modules/accounts/useCases/checkIsAdmin/CheckIsAdmin.Controller";
import { ConfirmMailController } from "../../../../modules/accounts/useCases/confirmMail/ConfirmMail.Controller";
import { CreateAddressUserController } from "../../../../modules/accounts/useCases/createAddressUser/CreateAddressUser.Controller";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/createUser.controller";
import { ListAddressUserController } from "../../../../modules/accounts/useCases/listAddressUser/ListAddressUser.Controller";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUser.Controller";
import { SendConfirmMailController } from "../../../../modules/accounts/useCases/sendConfirmMail/SendConfirmMail.Controller";
import { UpdatedAddressUserController } from "../../../../modules/accounts/useCases/updatedAddressUser/UpdatedAddressUser.Controller";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatar.Controller";
import { UpdateUserDataController } from "../../../../modules/accounts/useCases/updateUserData/UpdateUserData.Controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();
const confirmMailController = new ConfirmMailController();
const updateUserDataController = new UpdateUserDataController();
const changePasswordUserController = new ChangePasswordUserController();
const createAddressUserController = new CreateAddressUserController();
const listAddressUserController = new ListAddressUserController();
const updatedAddressUserController = new UpdatedAddressUserController();
const checkIsAdminController = new CheckIsAdminController();
const sendConfirmMailController = new SendConfirmMailController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/isadmin", checkIsAdminController.handle);

usersRoutes.get("/confirmation/:token", confirmMailController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.patch("/update", ensureAuthenticated, updateUserDataController.handle);

usersRoutes.patch("/password", ensureAuthenticated, changePasswordUserController.handle);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

usersRoutes.post("/address", ensureAuthenticated, createAddressUserController.handle);
usersRoutes.patch("/address", ensureAuthenticated, updatedAddressUserController.handle);
usersRoutes.get("/address", ensureAuthenticated, listAddressUserController.handle);

usersRoutes.post("/verify-email", sendConfirmMailController.handle);

export { usersRoutes };
