import { EventEmitter } from "node:events";
import sendEmail from "../../service/sendEmail.js";
import { generateToken } from "../token/generateToken.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on("sendEmail", async (data) => {
  const { email, req } = data;

  const token = await generateToken({
    payload: { email },
    SIGNATURE: process.env.SIGNATURE_CONFIRMATION,
    options: { expiresIn: "10m" },
  });

  const link = `${req.protocol}://${req.get(
    "host"
  )}/users/confirmEmail/${token}`;

  const emailSent = await sendEmail(
    email,
    "Confirm Email",
    `<a href=${link}> Click to Confirm Email</a>`
  );
  if (!emailSent) {
    return next(new Error("Failed to send email"));
  }
});

eventEmitter.on("unfreezeAccount", async (data) => {
  const { email, req } = data;

  const token = await generateToken({
    payload: { email },
    SIGNATURE: process.env.SIGNATURE_UNFREEZE,
    options: { expiresIn: "10m" },
  });

  const link = `${req.protocol}://${req.get(
    "host"
  )}/users/unfreezeAccount/${token}`;

  const emailSent = await sendEmail(
    email,
    "Confirm Email",
    `<a href=${link}> Click to Unfreeze Account</a>`
  );
  if (!emailSent) {
    return next(new Error("Failed to send email"));
  }
});
