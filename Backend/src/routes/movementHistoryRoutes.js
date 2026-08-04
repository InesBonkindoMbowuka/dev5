const express = require("express");
const router = express.Router();

const controller = require("../controllers/movementHistoryControllers");


router.get(
    "/:uid",
    (req,res)=>controller.getByPedestrian(req,res)
);


module.exports = router;