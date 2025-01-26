import messagesModel from "../../DB/models/messagesModel.js";
import usersModel from "../../DB/models/usersModel.js";
import { asyncHandler } from "../../utilities/index.js";

// ************************sendMessage**************************
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { content, userId } = req.body;
  if (!(await usersModel.findOne({ _id: userId, isDeleted: false }))) {
    return next(new Error("User not found", { cause: 400 }));
  }

  const message = await messagesModel.create({ content, userId });

  return res.status(201).json({ message: "done", message });
});

// ************************getMessages**************************
export const getMessages = asyncHandler(async (req, res, next) => {
  const messages = await messagesModel.find({ userId: req.user._id });

  return res.status(201).json({ message: "done", messages });
});

// ************************getMessages**************************
export const deleteMessage = asyncHandler(async (req, res, next) => {
  const result = await messagesModel.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 0) {
    return next(new Error("No message found"), { cause: 404 });
  }

  return res.status(201).json({ message: "done", result });
});
