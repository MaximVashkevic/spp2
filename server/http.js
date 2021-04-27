const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");

const stockRouter = require("./routers/stockRouter");
const mainRouter = require("./routers/mainRouter");

(async () => {
  const server = express();

  server.use(cookieParser());
  server.use(
    session({ secret: "keyboard cat", resave: false, saveUninitialized: true })
  );

  server.use(clearMessagesMiddleware);
  server.use(authorizationMiddleware);

  server.use("/", mainRouter);
  server.use("/stock", stockRouter);

  server.listen(3000, () => console.log("listening"));
})();