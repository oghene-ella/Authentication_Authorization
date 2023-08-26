/* Import Express Js */
const express = require("express");

/* import the router module */
const inventoryRouter = require("./router/router");
const inventoryUsersRouter = require("./inventory_user/user_router")

/* Create an express server */
const appServer = express();

/* create port and hostname*/
const port = 3040;
const hostname = "localhost";

/* Create a middleware that handles routing for the home route '/' */
appServer.get("/", (req, res) => {
	res.end("Hello!, Welcome\nMake use of '/inventory' or '/inventoryUser' using the api methods to route. ");
});

/* Create a middleware that handles routing for /inventory */
appServer.use("/inventory", inventoryRouter);
appServer.use("/inventoryUser", inventoryUsersRouter);

/* Listen to the Server */
appServer.listen(port, hostname, () => {
    console.log(`Listening at http://${hostname}:${port}`);
});
