const express = require("express");
const router = express.Router();

const {
	listing,
	signup,
	login,
	createMenu,
	deleteMenu,
	logout,
	operation,
	getItems,
} = require("../Controllers/controllers");

router.get("/api/", listing);
router.get("/api/operation", getItems);
router.post("/api/", signup);
router.post("/api/login/", login);
router.post("/api/createMenu/", createMenu);
router.post("/api/deleteMenu/", deleteMenu);
router.post("/api/logout/", logout);
router.post("/api/operation", operation);
module.exports = router;
