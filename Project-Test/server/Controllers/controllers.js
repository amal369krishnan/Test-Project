const models = require("../Model/models");
const io = require("../index");

/* Api for Listing Activity */
const listing = async (req, res) => {
	const data = await models.find({});
	res.json(data);
};
/* Api for Signup */
const signup = async (req, res) => {
	const userData = req.body;
	const createUser = new models({
		user: userData.user,
		signup: "Successfully Signed in",
	});
	try {
		const data = await createUser.save();
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
		data.signup = "Signed up at";
		let date_ob = new Date();
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		data.date = hours + "." + minutes;
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
		data.createmessage = "Created a menu";
		data.logout = "";
		try {
			const result = await data.save();
			global.io.emit("createMenu", result);
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
		data.createmessage = "deleted a menu";
		data.logout = "";
		try {
			const result = await data.save();
			global.io.emit("deleteMenu", result);
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
		data.logout = "Successfully logged out at ";
		let date_ob = new Date();
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		data.date = hours + "." + minutes;
		try {
			const result = await data.save();
			global.io.emit("logout", result);
			return res.status(200).json(result);
		} catch (error) {
			res.status(400).json(error);
		}
	}
	return res.status(404).send("Sign Up first");
};

module.exports = { listing, signup, login, createMenu, deleteMenu, logout };
