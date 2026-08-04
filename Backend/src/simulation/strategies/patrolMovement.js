class PatrolMovement {

    move(position) {

        return {
            x: position.x + 1,
            y: position.y
        };

    }

}

module.exports = PatrolMovement;