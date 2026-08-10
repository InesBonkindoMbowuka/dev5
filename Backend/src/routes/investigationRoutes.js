const express = require("express");
const router = express.Router();

const investigationController = require("../controllers/investigationControllers");

router.post(
    "/accuse",
    (req, res) => investigationController.accuse(req, res)
);

module.exports = router;