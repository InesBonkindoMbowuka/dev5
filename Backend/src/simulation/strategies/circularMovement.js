class CircularMovement {

    move(position, speed) {

        return {
            x: position.x,
            y: position.y + speed
        };

    }

}

module.exports = CircularMovement;