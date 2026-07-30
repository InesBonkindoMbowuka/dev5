const streetlightRepository = require("../repositories/streetlightRepository");

class StreetlightService {

    async getAllStreetlights() {
        return await streetlightRepository.findAll();
    }


    async getStreetlightByUid(uid) {
        return await streetlightRepository.findByUid(uid);
    }


    async createStreetlight(data) {
        return await streetlightRepository.create(data);
    }


    async deleteStreetlight(uid) {
        return await streetlightRepository.delete(uid);
    }

}

module.exports = new StreetlightService();