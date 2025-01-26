import Joi from "joi";
import { genderEnum } from "../../DB/models/usersModel.js";
import { generalRules } from "../../utilities/index.js";

export const signupSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .messages({ "string.min": "name must be at least 3 characters" }),
  email: generalRules.email,
  password: generalRules.password,
  cPassword: generalRules.password
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Passwords do not match" }),
  gender: Joi.string().valid(genderEnum.male, genderEnum.female),
  phone: Joi.string().regex(/^01[0125][0-9]{8}$/),
}).options({ presence: "required" });

export const loginSchema = Joi.object({
  email: generalRules.email,
  password: generalRules.password,
}).options({ presence: "required" });

export const updateProfileSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .messages({ "string.min": "name must be at least 3 characters" }),
  gender: Joi.string().valid(genderEnum.male, genderEnum.female),
  phone: Joi.string().regex(/^01[0125][0-9]{8}$/),
});

export const updatePasswordSchema = Joi.object({
  oldPassword: generalRules.password,
  newPassword: generalRules.password,
  cPassword: generalRules.password
    .valid(Joi.ref("newPassword"))
    .messages({ "any.only": "Passwords do not match" }),
}).options({ presence: "required" });

export const shareProfile = Joi.object({
  id: generalRules.objectId
}).options({ presence: "required" });

export const unFreezeAccountRequest = Joi.object({
  email: generalRules.email,
  password: generalRules.password,
}).options({ presence: "required" });


