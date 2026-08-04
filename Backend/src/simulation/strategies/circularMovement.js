class CircularMovement {

    constructor() {
        this.angle = 0;
    }


    move(position, speed) {

        const radius = 20;


        this.angle += 0.1 * speed;


        return {
            x: position.x + Math.cos(this.angle) * radius,
            y: position.y + Math.sin(this.angle) * radius
        };

    }

}


module.exports = CircularMovement;