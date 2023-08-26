/* import all the inbuilt and custom controller modules */
const express = require('express');
const bodyParser = require("body-parser");
const Controller = require("../controllers/Controller");
const globalMiddleware = require("../global_middleware");

/* create a router object using express.router() */
const dataRouter = express.Router();

/* create a middleware that parses requests [json data] */
dataRouter.use(bodyParser.json());

/* create the get method to get all items */
dataRouter.get(
    "/", 
    globalMiddleware.checkApi_key, 
    Controller.getData
);

/* create the get method to get all items */
dataRouter.get(
    "/:id", 
    globalMiddleware.checkApi_key, 
    Controller.getOneData
);

/* create the get method to get all items */
dataRouter.post(
	"/",
	globalMiddleware.checkApi_key,
	globalMiddleware.checkAdmin,
	globalMiddleware.checkItem,
	Controller.postData,
);

/* create the put method to update an item */
dataRouter.put(
	"/:id",
	globalMiddleware.checkApi_key,
	globalMiddleware.checkAdmin, 
    Controller.updateData,
);

/* create the delete method to delete an item */
dataRouter.delete(
	"/:id",
	globalMiddleware.checkApi_key,
	globalMiddleware.checkAdmin, 
    Controller.deleteData,
);

module.exports = dataRouter;

