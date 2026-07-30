const detectionService = require("../services/detectionServices");

class DetectionController {

    async getAll(req, res) {
        try {
            const detections = await detectionService.getAllDetections();

            res.json(detections);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async getByPedestrian(req, res) {
        try {
            const detections =
                await detectionService.getDetectionsByPedestrian(
                    req.params.uid
                );

            res.json(detections);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async getByStreetlight(req, res) {
        try {
            const detections =
                await detectionService.getDetectionsByStreetlight(
                    req.params.uid
                );

            res.json(detections);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async create(req, res) {
        try {
            const detection =
                await detectionService.createDetection(
                    req.body
                );

            res.status(201).json(detection);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async delete(req, res) {
        try {
            await detectionService.deleteDetection(
                req.params.id
            );

            res.json({
                message: "Detection deleted"
            });

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }

}

module.exports = new DetectionController();