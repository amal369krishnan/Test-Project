const mongoose = require("mongoose");

const operationModel = mongoose.Schema({
	id: String,
	operation: {
		type: [],
	},
});

module.exports = mongoose.model("Operation", operationModel);
