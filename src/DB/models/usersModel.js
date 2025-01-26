import mongoose from "mongoose";
import { roles } from "../../middlewares/auth.js";

export const genderEnum = {
  male: "male",
  female: "female",
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Incorrect email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: Object.values(genderEnum),
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.user,
    },
    passwordChangedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const usersModel = mongoose.models.User || mongoose.model("User", userSchema);

export default usersModel;
