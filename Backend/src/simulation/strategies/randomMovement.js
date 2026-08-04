class RandomMovement {

    move(position, speed) {

        return {
            x: position.x + (Math.floor(Math.random() * 3) - 1 * speed),
            y: position.y + (Math.floor(Math.random() * 3) - 1 * speed)
        };

    }

}

module.exports = RandomMovement;