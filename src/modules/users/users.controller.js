import { Router } from "express";
import * as UService from "./users.service.js";
import {
  authentication,
  authorization,
  roles,
} from "../../middlewares/auth.js";
import validation from "../../middlewares/validation.js";
import * as UValidation from "./userValidation.js";

const usersRouter = Router();


usersRouter.post(
  "/signup",
  validation(UValidation.signupSchema),
  UService.signup
);

usersRouter.get("/confirmEmail/:token", UService.confirmEmail);

usersRouter.post("/login", validation(UValidation.loginSchema), UService.login);

usersRouter.get(
  "/profile",
  authentication,
  authorization([roles.user]),
  UService.getProfile
);

usersRouter.patch(
  "/updateProfile",
  authentication,
  validation(UValidation.updateProfileSchema),
  UService.updateProfile
);

usersRouter.patch(
  "/updatePassword",
  authentication,
  validation(UValidation.updatePasswordSchema),
  UService.updatePassword
);

usersRouter.delete(
  "/freezeAccount",
  authentication,
  UService.freezeAccount
);

usersRouter.post(
  "/unFreezeAccountRequest",
  validation(UValidation.unFreezeAccountRequest),
  UService.unFreezeAccountRequest
);

usersRouter.get("/unfreezeAccount/:token", UService.unfreezeAccount);

usersRouter.get(
  "/shareProfile/:id",
  validation(UValidation.shareProfile),
  UService.shareProfile
);

export default usersRouter;
