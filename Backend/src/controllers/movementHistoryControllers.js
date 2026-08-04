const MovementHistory = require("../models/MovementHistory");


class MovementHistoryController {


    async getByPedestrian(req, res) {

        try {

            const history = await MovementHistory.find({
                pedestrianUid: req.params.uid
            }).sort({
                tick: 1
            });


            res.json(history);


        } catch(error) {

            res.status(500).json({
                error: error.message
            });

        }

    }

}


module.exports = new MovementHistoryController();