const Pedestrian = require("../models/Pedestrian");

class PedestrianRepository {

    async findAll() {
        return await Pedestrian.find();
    }


    async findByUid(uid) {
        return await Pedestrian.findOne({ uid });
    }


    async create(data) {
        const pedestrian = new Pedestrian(data);
        return await pedestrian.save();
    }


    async delete(uid) {
        return await Pedestrian.deleteOne({ uid });
    }

}

module.exports = new PedestrianRepository();