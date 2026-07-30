const detectionRepository = require("../repositories/detectionRepository");

class DetectionService {

    async getAllDetections() {
        return await detectionRepository.findAll();
    }


    async getDetectionsByPedestrian(pedestrianUid) {
        return await detectionRepository.findByPedestrianUid(
            pedestrianUid
        );
    }


    async getDetectionsByStreetlight(streetlightUid) {
        return await detectionRepository.findByStreetlightUid(
            streetlightUid
        );
    }


    async createDetection(data) {
        return await detectionRepository.create(data);
    }


    async deleteDetection(id) {
        return await detectionRepository.delete(id);
    }

}

module.exports = new DetectionService();