const Streetlight = require("../models/Streetlight");


const MAP_SIZE = 100;


class StreetlightSpawner {


    async spawnStreetlights() {

        const existingLights = await Streetlight.countDocuments();


        if (existingLights > 0) {
            console.log("Streetlights already exist");
            return;
        }


        const streetlights = [];


        for (let i = 0; i < 5; i++) {

            streetlights.push({

                uid: `SL${Date.now()}-${i}`,

                position: {
                    x: Math.random() * MAP_SIZE,
                    y: Math.random() * MAP_SIZE
                },

                radius: 10,

                active: true,

                energyUsage: 0

            });

        }


        await Streetlight.insertMany(streetlights);


        console.log("Spawned 5 streetlights");

    }

}


module.exports = new StreetlightSpawner();