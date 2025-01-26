import messagesModel from "../../DB/models/messagesModel.js";
import usersModel from "../../DB/models/usersModel.js";
import {
  asyncHandler,
  Compare,
  Decrypt,
  Encrypt,
  eventEmitter,
  generateToken,
  Hash,
  verifyToken,
} from "../../utilities/index.js";

// ************************signup**************************
export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, gender, phone } = req.body;

  // Check if email exists
  if (await usersModel.findOne({ email })) {
    return next(new Error("Email already exists"), { cause: 400 });
  }

  // Hash password
  const hashPassword = await Hash({
    password,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
  });

  // Encrypt phone
  const cipherPhone = await Encrypt({
    key: phone,
    SECRET_KEY: process.env.SECRET_KEY,
  });

  // Send confirmation email
  eventEmitter.emit("sendEmail", { email });

  // Create user
  const user = await usersModel.create({
    name,
    email,
    password: hashPassword,
    gender,
    phone: cipherPhone,
  });

  return res.status(201).json({ message: "done", user });
});

// ************************confirmEmail**************************
export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(new Error("Token not found"), { cause: 401 });
  }

  const decoded = await verifyToken({
    token,
    SIGNATURE: process.env.SIGNATURE_CONFIRMATION,
  });

  if (!decoded?.email) {
    return next(new Error("Invalid token payload"), { cause: 400 });
  }

  const user = await usersModel.findOneAndUpdate(
    { email: decoded.email, confirmed: false },
    { confirmed: true }
  );

  if (!user) {
    return next(new Error("User not found or already confirmed"), {
      cause: 400,
    });
  }

  return res.status(200).json({ message: "done" });
});

// ************************login**************************
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check email
  const user = await usersModel.findOne({ email, confirmed: true });

  if (!user) {
    return next(new Error("Email does not exist or not confirmed yet"));
  }

  // Check password
  if (!(await Compare({ password, hashed: user.password }))) {
    return next(new Error("Incorrect password"), { cause: 400 });
  }

  // Generate token
  const token = await generateToken({
    payload: { email, id: user._id },
    SIGNATURE:
      user.role === "user"
        ? process.env.SIGNATURE_Token_USER
        : process.env.SIGNATURE_Token_ADMIN,
    options: { expiresIn: "3h" },
  });

  return res.status(201).json({ message: "done", token });
});

// ************************getProfile**************************
export const getProfile = asyncHandler(async (req, res, next) => {
  req.user.phone = await Decrypt({ key: req.user.phone });

  const messages = await messagesModel.find({ userId: req.user._id });

  return res.status(200).json({ message: "done", user: req.user, messages });
});

// ************************updateProfile**************************
export const updateProfile = asyncHandler(async (req, res, next) => {
  if (req.body.phone) {
    req.body.phone = await Encrypt({
      key: req.body.phone,
      SECRET_KEY: process.env.SECRET_KEY,
    });
  }

  const user = await usersModel.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  return res.status(200).json({
    message: "done",
    user,
  });
});

// ************************updatePassword**************************
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!(await Compare({ password: oldPassword, hashed: req.user.password }))) {
    return next(new Error("Incorrect password"), { cause: 400 });
  }

  const hash = await Hash({ password: newPassword });

  const user = await usersModel.findByIdAndUpdate(
    req.user._id,
    { password: hash, passwordChangedAt: Date.now() },
    {
      new: true,
    }
  );

  return res.status(200).json({
    message: "done",
    user,
  });
});

// ************************freezeAccount**************************
export const freezeAccount = asyncHandler(async (req, res, next) => {
  await usersModel.findByIdAndUpdate(
    req.user._id,
    { isDeleted: true },
    {
      new: true,
    }
  );

  return res.status(200).json({
    message: "done",
  });
});

// ************************unFreezeAccountRequest**************************
export const unFreezeAccountRequest = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await usersModel.findOne({ email, isDeleted: true });

  if (!user) {
    return next(new Error("Email does not exist or not freezed"), {
      cause: 400,
    });
  }

  if (!(await Compare({ password, hashed: user.password }))) {
    return next(new Error("Incorrect password"), {
      cause: 400,
    });
  }

  eventEmitter.emit("unfreezeAccount", { email, req });

  return res.status(200).json({
    message: "done",
  });
});

// ************************unfreezeAccount**************************
export const unfreezeAccount = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(new Error("Token not found"), { cause: 401 });
  }

  const decoded = await verifyToken({
    token,
    SIGNATURE: process.env.SIGNATURE_UNFREEZE,
  });

  if (!decoded?.email) {
    return next(new Error("Invalid token payload"), { cause: 400 });
  }

  const user = await usersModel.findOneAndUpdate(
    { email: decoded.email, isDeleted: true },
    { isDeleted: false }
  );

  if (!user) {
    return next(new Error("User not found or not freezed"), {
      cause: 400,
    });
  }

  return res.status(200).json({ message: "done" });
});

// ************************shareProfile**************************
export const shareProfile = asyncHandler(async (req, res, next) => {
  const user = await usersModel
    .findById(req.params.id)
    .select("name email phone -_id");

  return user
    ? res.status(200).json({
        message: "done",
        user,
      })
    : next(new Error(Error("User not found"), { cause: 404 }));
});
