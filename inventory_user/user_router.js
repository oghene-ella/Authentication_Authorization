const express = require("express");
const controller = require("./user_controller");
const middleware = require("./user_middleware");
const bodyParser = require("body-parser");

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.post("/", middleware.checkBody, controller.createUser);

module.exports = userRouter;