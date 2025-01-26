import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      minLength: 1,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User Id is required"],
      ref: "User",
    },
  },
  { timestamps: true }
);

const messagesModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default messagesModel;
