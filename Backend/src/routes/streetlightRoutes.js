const express = require("express");
const router = express.Router();
const streetlightController = require("../controllers/streetlightControllers");


router.get(
    "/",
    (req, res) => streetlightController.getAll(req, res)
);

router.get(
    "/:uid",
    (req, res) => streetlightController.getByUid(req, res)
);

router.post(
    "/",
    (req, res) => streetlightController.create(req, res)
);

router.delete(
    "/:uid",
    (req, res) => streetlightController.delete(req, res)
);

module.exports = router;