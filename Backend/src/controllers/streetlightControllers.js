const streetlightService = require("../services/streetlightServices");

class StreetlightController {

    async getAll(req, res) {
        try {
            const streetlights = await streetlightService.getAllStreetlights();

            res.json(streetlights);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async getByUid(req, res) {
        try {
            const streetlight = await streetlightService.getStreetlightByUid(
                req.params.uid
            );

            if (!streetlight) {
                return res.status(404).json({
                    message: "Streetlight not found"
                });
            }

            res.json(streetlight);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async create(req, res) {
        try {
            const streetlight = await streetlightService.createStreetlight(
                req.body
            );

            res.status(201).json(streetlight);

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }


    async delete(req, res) {
        try {
            await streetlightService.deleteStreetlight(
                req.params.uid
            );

            res.json({
                message: "Streetlight deleted"
            });

        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    }

}

module.exports = new StreetlightController();