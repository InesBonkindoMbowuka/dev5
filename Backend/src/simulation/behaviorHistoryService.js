const BehaviorHistory = require("../models/BehaviorHistory");

class BehaviorHistoryService {

    async saveBehavior(pedestrian, behavior, tick) {

        await BehaviorHistory.create({

            pedestrianUid: pedestrian.uid,

            tick: tick,

            behavior: behavior

        });

    }

}

module.exports = new BehaviorHistoryService();