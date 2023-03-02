import { Router } from "express";
import { ResetPasswordController } from "../../../../modules/accounts/useCases/resetPassword/ResetPassword.Controller";
import { ResetPasswordCheckTokenController } from "../../../../modules/accounts/useCases/resetPasswordCheckToken/ResetPasswordCheckToken.Controller";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMail.Controller";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();
const resetPasswordCheckTokenController = new ResetPasswordCheckTokenController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);
passwordRoutes.post("/verify-reset-token", resetPasswordCheckTokenController.handle);

export { passwordRoutes };
