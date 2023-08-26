const path = require("path");
const fs = require("fs");

const dbFile = path.join(__dirname, "../db", "inventory.json");

/* Get all Data */
const getData = (req, res) => {
	const dataDB = fs.readFileSync(dbFile);
	res.status(200)
	res.send(JSON.parse(dataDB));
};

/* Get One Data */
const getOneData = (req, res) => {
	const dataDB = fs.readFileSync(dbFile);
	const theData = JSON.parse(dataDB);

	const dataId = req.params.id;

	const getData = theData.find((data) => {
		return data.id == parseInt(dataId);
	});

	if (!getData) {
		return res.status(404).send(`Sorry! Data, not found`);
	}
	res.status(200)
    res.json(getData);
};

/* Post an item */
const postData = (req, res) => {
	const dataDB = fs.readFileSync(dbFile);

	const data = JSON.parse(dataDB);

	const dataToAdd = req.body;

	const addIt = {
		...dataToAdd,
		id: Math.floor(Math.random() * 100).toString(),
	};

	data.push(addIt);

	fs.writeFile(dbFile, JSON.stringify(data), (error) => {
		if (error) {
			res.status(500);
            res.send("An error has occurred");
		}

		res.status(200);
        res.json(data);
	});
};

const updateData = (req, res) => {
	const dataDB = fs.readFileSync(dbFile);

	const the_data = JSON.parse(dataDB);

	const dataToUpdate = req.body;

	const id = req.params.id;

	const getIndex = the_data.findIndex((data) => data.id == parseInt(id));

	if (getIndex == -1) {
		res.status(404);
		res.end("data not found");
	}

	the_data[getIndex] = { ...the_data[getIndex], ...dataToUpdate };

	fs.writeFile(dbFile, JSON.stringify(the_data), (error) => {
		if (error) {
			res.status(500);
			res.end("update not successful");
		}

		res.status(200);
		res.json(the_data[getIndex]);
		res.send("Successfully updated the data");
	});
};

const deleteData = (req, res) => {
	const dataDB = fs.readFileSync(dbFile);

	const the_data = JSON.parse(dataDB);

	const id = req.params.id;

	const getIndex = the_data.findIndex((data) => data.id == parseInt(id));

	if (getIndex == -1) {
		res.status(404);
		res.end("data not found");
	}

	the_data.splice(getIndex, 1);

	fs.writeFile(dbFile, JSON.stringify(the_data), (error) => {
		if (error) {
			res.status(500);
			res.end("deletion was not successful");
		}

		res.status(200);
		res.send("Successfully deleted the data");
	});
};

module.exports = {
	getData,
	getOneData,
	postData,
	updateData,
	deleteData
};