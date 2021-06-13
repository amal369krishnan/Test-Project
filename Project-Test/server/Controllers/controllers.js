const models = require("../Model/models");
const io = require("../index");

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
		global.io.emit("login", data);
		res.status(200).json(data);
	} catch (error) {
		res.send(error);
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
		global.io.emit("login", data);
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
			global.io.emit("login", result);
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
			global.io.emit("login", result);
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
			global.io.emit("login", result);
			return res.status(200).json(result);
		} catch (error) {
			res.status(400).json(error);
		}
	}
	return res.status(404).send("Sign Up first");
};

module.exports = { listing, signup, login, createMenu, deleteMenu, logout };
