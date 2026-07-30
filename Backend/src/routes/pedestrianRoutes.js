const express = require("express");
const router = express.Router();
const pedestrianController = require("../controllers/pedestrianControllers");

router.get(
    "/",
    (req, res) => pedestrianController.getAll(req, res)
);


router.get(
    "/:uid",
    (req, res) => pedestrianController.getByUid(req, res)
);


router.post(
    "/",
    (req, res) => pedestrianController.create(req, res)
);


router.delete(
    "/:uid",
    (req, res) => pedestrianController.delete(req, res)
);

module.exports = router;