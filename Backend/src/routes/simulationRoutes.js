const express = require("express");
const router = express.Router();

const simulationController = require("../controllers/simulationControllers");


router.post(
    "/start",
    (req, res) => simulationController.start(req, res)
);


router.post(
    "/stop",
    (req, res) => simulationController.stop(req, res)
);


router.post(
    "/reset",
    (req, res) => simulationController.reset(req, res)
);


router.get(
    "/status",
    (req, res) => simulationController.status(req, res)
);


module.exports = router;