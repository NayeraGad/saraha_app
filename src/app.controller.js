import connectionDB from "./DB/connectionDB.js";
import messagesRouter from "./modules/messages/messages.controller.js";
import usersRouter from "./modules/users/users.controller.js";
import { globalErrorHandler } from "./utilities/index.js";
import cors from "cors";

const bootstrap = (app, express) => {
  app.use(cors());

  connectionDB();

  app.use(express.json());

  app.get("/", (req, res, next) => {
    return res.status(200).json({ message: "Welcome to Saraha" });
  });

  app.use("/users", usersRouter);
  app.use("/messages", messagesRouter);

  app.use("*", (req, res, next) => {
    return next(new Error(`invalid url ${req.originalUrl}`, { cause: 404 }));
  });

  app.use(globalErrorHandler);
};

export default bootstrap;
