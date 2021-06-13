const mongoose = require("mongoose");

const activity = new mongoose.Schema(
	{
		user: {
			type: String,
			required: true,
		},
		
		password: {
			type: String,
			required: true,
		},

		signup: {
			type: String,
		},

		login: String,

		createmessage: {
			type: String,
		},

		logout: {
			type: String,
		},

		date: String,

		operation: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Activity", activity);
