const express = require("express");
const router = express.Router();
const {
	listing,
	signup,
	login,
	createMenu,
	deleteMenu,
	logout,
} = require("../Controllers/controllers");

router.get("/api/", listing);
router.post("/api/", signup);
router.post("/api/login/", login);
router.post("/api/createMenu/", createMenu);
router.delete("/api/deleteMenu/", deleteMenu);
router.post("/api/logout/", logout);
module.exports = router;
