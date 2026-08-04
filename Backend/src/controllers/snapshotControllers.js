const SimulationSnapshot = require("../models/SimulationSnapshot");


class SnapshotController {

    async getAll(req, res) {

        try {

            const snapshots = await SimulationSnapshot.find();

            res.json(snapshots);

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }

    }

}


module.exports = new SnapshotController();