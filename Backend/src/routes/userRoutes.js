const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");

router.post("/", userController.getOrCreateUser);
router.get("/:userUid/stats", userController.getStats);

module.exports = router;