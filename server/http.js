const express = require("express");
const cookieParser = require("cookie-parser");
const authorizationMiddleware = require("./middlewares/authorizationMiddleware");

const stockRouter = require("./routers/stockRouter");
const mainRouter = require("./routers/mainRouter");

(async () => {
  const server = express();

  server.use(express.json())
  server.use(cookieParser());

  server.use(authorizationMiddleware);

  server.use("/", mainRouter);
  server.use("/stock", stockRouter);

  server.listen(3000, () => console.log("listening"));
})();