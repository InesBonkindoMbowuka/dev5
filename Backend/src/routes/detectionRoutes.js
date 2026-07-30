const express = require("express");
const router = express.Router();
const detectionController = require("../controllers/detectionControllers");

router.get(
    "/",
    (req, res) => detectionController.getAll(req, res)
);

router.get(
    "/pedestrian/:uid",
    (req, res) => detectionController.getByPedestrian(req, res)
);

router.get(
    "/streetlight/:uid",
    (req, res) => detectionController.getByStreetlight(req, res)
);

router.post(
    "/",
    (req, res) => detectionController.create(req, res)
);

router.delete(
    "/:id",
    (req, res) => detectionController.delete(req, res)
);

module.exports = router;