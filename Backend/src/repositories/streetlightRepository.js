const Streetlight = require("../models/Streetlight");

class StreetlightRepository {

    async findAll() {
        return await Streetlight.find();
    }


    async findByUid(uid) {
        return await Streetlight.findOne({ uid });
    }


    async create(data) {
        const streetlight = new Streetlight(data);
        return await streetlight.save();
    }


    async delete(uid) {
        return await Streetlight.deleteOne({ uid });
    }

}

module.exports = new StreetlightRepository();