import Joi from "joi";
import { Types } from "mongoose";

export const customId = (value, helper) => {
  let data = Types.ObjectId.isValid(value);

  return data ? value : helper.message("id is not valid");
};

export const generalRules = {
  objectId: Joi.string().custom(customId),
  email: Joi.string().email({
    tlds: { allow: ["com", "net"] },
    minDomainSegments: 2,
    maxDomainSegments: 4,
  }),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
  headers: Joi.object({
    authorization: Joi.string().required(),
    "cache-control": Joi.string(),
    "postman-token": Joi.string(),
    "content-type": Joi.string(),
    "content-length": Joi.string(),
    host: Joi.string(),
    "user-agent": Joi.string(),
    accept: Joi.string(),
    "accept-encoding": Joi.string(),
    connection: Joi.string(),
  }),
};
