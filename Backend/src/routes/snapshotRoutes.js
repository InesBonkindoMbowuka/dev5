const express = require("express");
const router = express.Router();

const snapshotController = require("../controllers/snapshotControllers");


router.get(
    "/",
    (req, res) => snapshotController.getAll(req, res)
);


module.exports = router;