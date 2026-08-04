class PatrolMovement {

    move(position, speed) {

        let direction = speed;


        if (position.x >= 100) {
            direction = -speed;
        }

        if (position.x <= 0) {
            direction = speed;
        }


        return {
            x: position.x + direction,
            y: position.y
        };

    }

}

module.exports = PatrolMovement;