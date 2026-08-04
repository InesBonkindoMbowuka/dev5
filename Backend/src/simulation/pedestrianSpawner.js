const Pedestrian = require("../models/Pedestrian");


class PedestrianSpawner {

    constructor() {
        this.maxPedestrians = 10;
    }


    async spawnPedestrians() {

        const currentCount = await Pedestrian.countDocuments();


        const amountToSpawn = this.maxPedestrians - currentCount;


        if (amountToSpawn <= 0) {
            console.log("Maximum pedestrians reached");
            return;
        }


        for (let i = 0; i < amountToSpawn; i++) {

            const pedestrian = new Pedestrian({

                uid: `P${Date.now()}-${i}`,
                name: `Pedestrian ${i + 1}`,

                position: {
                    x: Math.floor(Math.random() * 101),
                    y: Math.floor(Math.random() * 101)
                },

                speed: Math.floor(Math.random() * 2) + 1,

                movementStrategy: "circular",

                totalDistance: 0
            });


            await pedestrian.save();
        }


        console.log(
            `Spawned ${amountToSpawn} pedestrians`
        );
    }

}


module.exports = new PedestrianSpawner();