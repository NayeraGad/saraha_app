import { Router } from "express";
import * as MService from "./messages.service.js";
import validation from "../../middlewares/validation.js";
import * as MValidation from "./messages.validation.js";
import { authentication } from "../../middlewares/auth.js";

const messagesRouter = Router();

messagesRouter.post(
  "/sendMessage",
  validation(MValidation.sendMessageSchema),
  MService.sendMessage
);

messagesRouter.get("/getMessages", authentication, MService.getMessages);

messagesRouter.delete(
  "/deleteMessage/:id",
  validation(MValidation.deleteMessageSchema),
  authentication,
  MService.deleteMessage
);

export default messagesRouter;
