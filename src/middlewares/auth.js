import jwt from "jsonwebtoken";
import usersModel from "../DB/models/usersModel.js";
import { asyncHandler } from "../utilities/error/index.js";

export const roles = {
  user: "user",
  admin: "admin",
};

export const authentication = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  const [prefix, token] = authorization?.split(" ") || [];

  if (!prefix || !token) {
    return next(new Error("Token not found"), { cause: 401 });
  }

  let SIGNATURE = undefined;

  // Set SIGNATURE based on roles
  if (prefix === "Admin") {
    SIGNATURE = process.env.SIGNATURE_Token_ADMIN;
  } else if (prefix === "Bearer") {
    SIGNATURE = process.env.SIGNATURE_Token_USER;
  } else {
    return next(new Error("Invalid token prefix"), { cause: 401 });
  }

  const decodedToken = jwt.verify(token, SIGNATURE);

  if (!decodedToken?.id) {
    return next(new Error("Invalid token payload"), { cause: 403 });
  }

  const user = await usersModel.findById(decodedToken.id);

  if (!user) {
    return next(new Error("User not found"), { cause: 404 });
  }

  if (
    user.passwordChangedAt &&
    parseInt(user?.passwordChangedAt.getTime() / 1000) > decodedToken.iat
  ) {
    return next(new Error("Token expired"), { cause: 401 });
  }

  if (user?.isDeleted) {
    return next(new Error("User was deleted"), { cause: 401 });
  }

  req.user = user;
  next();
});

export const authorization = (accessRoles = []) => {
  return asyncHandler((req, res, next) => {
    if (!req.user || !accessRoles.includes(req.user.role)) {
      return next(new Error("Access denied"), { cause: 403 });
    }

    return next();
  });
};
