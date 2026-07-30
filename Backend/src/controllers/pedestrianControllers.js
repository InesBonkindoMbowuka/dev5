const pedestrianService = require("../services/pedestrianServices");

class PedestrianController {

    async getAll(req, res) {
        try {
            const pedestrians = await pedestrianService.getAllPedestrians();

            res.json(pedestrians);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async getByUid(req, res) {
        try {
            const pedestrian = await pedestrianService.getPedestrianByUid(
                req.params.uid
            );

            if (!pedestrian) {
                return res.status(404).json({
                    message: "Pedestrian not found"
                });
            }

            res.json(pedestrian);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async create(req, res) {
        try {
            const pedestrian = await pedestrianService.createPedestrian(
                req.body
            );

            res.status(201).json(pedestrian);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async delete(req, res) {
        try {
            await pedestrianService.deletePedestrian(
                req.params.uid
            );

            res.json({
                message: "Pedestrian deleted"
            });

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }

}

module.exports = new PedestrianController();