const operationModel = require("../Model/OperationModel");
const models = require("../Model/models");
const io = require("../index");
const fetch = require("node-fetch");
const OperationModel = require("../Model/OperationModel");

/* Api for Listing Activity */
const listing = async (req, res) => {
	const data = await models.find({});
	res.json(data);
};
/* Api for Signup */
const signup = async (req, res) => {
	let date_ob = new Date();
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();
	date = hours + "." + minutes;
	const createUser = new models({
		user: req.body.user,
		password: req.body.password,
		signup: "signup at",
		operation: "signup",
		date: date,
	});
	try {
		const data = await createUser.save();
		const response = await fetch("http://localhost:8090/api/operation", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ data }),
		});
		return res.status(200).json(data);
	} catch (error) {
		return res.send(error);
	}
};

/*Api for login */
const login = async (req, res) => {
	try {
		data = await models.findById(req.body.id);
	} catch (error) {
		return res.status(404).send("User not found");
	}

	if (data && data.signup) {
		data.logout = "";
		data.login = "login at";
		let date_ob = new Date();
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		data.date = hours + "." + minutes;
		data.operation = "login";
		await data.save();
		const response = await fetch("http://localhost:8090/api/operation", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ data }),
		});
		return res.status(200).json(data);
	}
	return res.status(404).send("User not found");
};

/* Api for Creating Menu */
const createMenu = async (req, res) => {
	try {
		data = await models.findById(req.body.id);
	} catch (err) {
		return res.status(404).send("Sign Up first");
	}
	if (data) {
		data.createmessage = "create a menu";
		data.logout = "";
		data.operation = "createMenu";
		try {
			const result = await data.save();
			const response = await fetch("http://localhost:8090/api/operation", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ data }),
			});
			return res.status(200).json(result);
		} catch (error) {
			res.status(400).json(error);
		}
		return res.status(404).send("Sign Up first");
	}
};

/* Api for deleting Menu */
const deleteMenu = async (req, res) => {
	try {
		data = await models.findById(req.body.id);
	} catch (err) {
		return res.status(404).send("Sign Up first");
	}
	if (data) {
		data.createmessage = "delete a menu";
		data.logout = "";
		data.operation = "deleteMenu";
		try {
			const result = await data.save();
			const response = await fetch("http://localhost:8090/api/operation", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ data }),
			});
			return res.status(200).json(result);
		} catch (error) {
			res.status(400).json(error);
		}
	}
	return res.status(404).send("Sign Up first");
};

/* Api for logout */
const logout = async (req, res) => {
	try {
		data = await models.findById(req.body.id);
	} catch (err) {
		return res.status(404).send("Sign Up first");
	}
	if (data) {
		data.logout = "logout at ";
		let date_ob = new Date();
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		data.date = hours + "." + minutes;
		data.operation = "logout";
		try {
			const result = await data.save();
			const response = await fetch("http://localhost:8090/api/operation", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({ data }),
			});
			return res.status(200).json(result);
		} catch (error) {
			res.status(400).json(error);
		}
	}
	return res.status(404).send("Sign Up first");
};

/*For Operation Listing */
const operation = async (req, res) => {
	const dat = req.body.data;
	switch (dat.operation) {
		case "signup":
			const signup = await operationModel.find({});
			if (signup.length === 0) {
				let opera = await new OperationModel({
					operation: dat.user + " " + dat.signup + " " + dat.date,
				});
				try {
					opera = opera.save();
					global.io.emit("login", opera);
					return res.status(200).json(opera);
				} catch (error) {
					return res.status(200).json(error);
				}
			} else {
				try {
					const update = await operationModel.updateOne({
						$push: { operation: dat.user + " " + dat.signup + " " + dat.date },
					});
					global.io.emit("login", update);
					return res.status(200).json(update);
				} catch (error) {
					return res.status(200).json(error);
				}
			}
			break;

		case "login":
			const login = await operationModel.find({});
			if (login) {
				try {
					const update = await operationModel.updateOne({
						$push: { operation: dat.user + " " + dat.login + " " + dat.date },
					});
					global.io.emit("login", update);
					return res.status(200).json(update);
				} catch (error) {
					return res.status(200).json(error);
				}
			}
			break;

		case "createMenu":
			const createMenu = await operationModel.find({});
			if (createMenu) {
				try {
					const update = await operationModel.updateOne({
						$push: { operation: dat.user + " " + dat.createmessage },
					});
					global.io.emit("login", update);
					return res.status(200).json(update);
				} catch (error) {
					return res.status(200).json(error);
				}
			}
			break;

		case "deleteMenu":
			const deleteMenu = await operationModel.find({});
			if (deleteMenu) {
				try {
					const update = await operationModel.updateOne({
						$push: { operation: dat.user + " " + dat.createmessage },
					});
					global.io.emit("login", update);
					return res.status(200).json(update);
				} catch (error) {
					return res.status(200).json(error);
				}
			}
			break;

		case "logout":
			console.log(dat);
			const logout = await operationModel.find({});
			if (logout) {
				try {
					const update = await operationModel.updateOne({
						$push: { operation: dat.user + " " + dat.logout + dat.date },
					});
					global.io.emit("login", update);
					return res.status(200).json(update);
				} catch (error) {
					return res.status(200).json(error);
				}
			}
			break;
		default:
			break;
	}
};
const getItems = async (req, res) => {
	const getItems = await operationModel.find({});
	return res.status(200).json(getItems);
};

module.exports = {
	listing,
	signup,
	login,
	createMenu,
	deleteMenu,
	logout,
	operation,
	getItems,
};
