const fs = require("fs");
const path = require("path");

const userDbFile = path.join(__dirname, "./db", "user.json"); 

const createUser = (req, res) => {
	const usersData = fs.readFileSync(userDbFile);
	const userDB = JSON.parse(usersData);

	const newUser = req.body;
	newUser.api_key = `${newUser.username}_${newUser.password}`;

	if (newUser.username === "Ellahhh") {
		newUser.user_type = "admin";
	} else {
		newUser.user_type = "user";
	}

	userDB.push(newUser);
	fs.writeFile(userDbFile, JSON.stringify(userDB), (err) => {
		if (err) {
			res.status(500).json({
				message: "internal server error",
			});
		}
		res.status(200).json(newUser);
	});
};

module.exports = { createUser };
