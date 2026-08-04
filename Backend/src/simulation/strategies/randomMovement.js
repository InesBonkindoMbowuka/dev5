class RandomMovement {

    move(position) {

        return {
            x: position.x + (Math.floor(Math.random() * 3) - 1),
            y: position.y + (Math.floor(Math.random() * 3) - 1)
        };

    }

}

module.exports = RandomMovement;