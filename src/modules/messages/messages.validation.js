import Joi from "joi";
import { generalRules } from "../../utilities/index.js";

export const sendMessageSchema = Joi.object({
  content: Joi.string().min(1).required(),
  userId: generalRules.objectId.required(),
});

export const deleteMessageSchema = Joi.object({
  id: generalRules.objectId.required(),
});
