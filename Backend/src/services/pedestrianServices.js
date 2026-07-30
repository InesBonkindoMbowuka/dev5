const pedestrianRepository = require("../repositories/pedestrianRepository");

class PedestrianService {

    async getAllPedestrians() {
        return await pedestrianRepository.findAll();
    }


    async getPedestrianByUid(uid) {
        return await pedestrianRepository.findByUid(uid);
    }


    async createPedestrian(data) {
        return await pedestrianRepository.create(data);
    }


    async deletePedestrian(uid) {
        return await pedestrianRepository.delete(uid);
    }

}

module.exports = new PedestrianService();