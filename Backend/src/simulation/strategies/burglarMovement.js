class BurglarMovement {
	constructor() {
		this.homes = [
			{ x: 10, y: 10 }, 
			{ x: 90, y: 10 }, 
			{ x: 90, y: 90 }, 
		];
	}

	move(position, speed, tick) {
		let target;
		let effectiveSpeed = 8;
		if (tick <= 8) {
			target = this.homes[0];
		}
		else if (tick <= 18) {
			target = this.homes[1];
		}
		else {
			target = this.homes[2];
		}

		const dx = target.x - position.x;
		const dy = target.y - position.y;

		const distance = Math.sqrt(dx * dx + dy * dy);
		if (distance <= effectiveSpeed) {
			return {
				x: target.x,
				y: target.y,
			};
		}
		return {
			x: position.x + (dx / distance) * effectiveSpeed,
			y: position.y + (dy / distance) * effectiveSpeed,
		};
	}
}

module.exports = BurglarMovement;