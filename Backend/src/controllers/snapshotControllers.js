const SimulationSnapshot = require("../models/SimulationSnapshot");

class SnapshotController {
	async getAll(req, res) {
		try {
			const snapshots = await SimulationSnapshot.find().sort({
				tick: 1,
			});

			res.json(snapshots);
		} catch (error) {
			res.status(500).json({
				error: error.message,
			});
		}
	}

    async getLatest(req, res) {

        try {

            const snapshot = await SimulationSnapshot.findOne()
                .sort({
                    tick: -1
                });

            res.json(snapshot);

        } catch(error) {

            res.status(500).json({
                error: error.message
            });

        }

    }
}

module.exports = new SnapshotController();
