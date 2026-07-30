const Detection = require("../models/Detection");

class DetectionRepository {

    async findAll() {
        return await Detection.find();
    }


    async findByPedestrianUid(pedestrianUid) {
        return await Detection.find({ pedestrianUid });
    }


    async findByStreetlightUid(streetlightUid) {
        return await Detection.find({ streetlightUid });
    }


    async create(data) {
        const detection = new Detection(data);
        return await detection.save();
    }


    async delete(id) {
        return await Detection.deleteOne({ _id: id });
    }

}

module.exports = new DetectionRepository();