class PatrolMovement {

    move(position, speed) {

        return {
            x: position.x + speed,
            y: position.y
        };

    }

}

module.exports = PatrolMovement;