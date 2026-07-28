const express = require("express");
const router = express.Router();

const Pedestrian = require("../models/Pedestrian");

router.post("/pedestrian", async (req, res) => {
    try {
        const pedestrian = new Pedestrian({
            uid: "P001",
            position: {
                x: 10,
                y: 20
            }
        });

        await pedestrian.save();

        res.json(pedestrian);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;