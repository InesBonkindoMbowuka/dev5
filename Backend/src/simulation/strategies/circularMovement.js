class CircularMovement {

    move(position) {

        return {
            x: position.x,
            y: position.y + 1
        };

    }

}

module.exports = CircularMovement;