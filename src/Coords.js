class Coords {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	//------------------------------------------ Set coordinates (Mutations)
	/** Set the coordinates */
	set({x, y}) {
		this.x = x || 0;
		this.y = y || 0;
		return this;
	}
	/** Set x and y to zero */
	clear() {
		this.x = 0;
		this.y = 0;
	}
	/** If the coordinate x y values are invalid, try to fix them */
	fix() {
		if (this.check()) { return true; } // Didn't need fixing
		this.x = Number(this.x);
		this.y = Number(this.y);
		if (this.check()) { return true; } // Fixed and values should be what you'd expect
		this.x = 0;
		this.y = 0;
		return false; // Fixed and values could not be salvaged so zeroes were used
	}
	/** Add coordinates by another {x, y} coordinate */
	add({x, y}) {
		this.x += x || 0;
		this.y += y || 0;
		return this;
	}
	/** Subtract coordinates by another {x, y} coordinate */
	subtract({x, y}) {
		this.x -= x || 0;
		this.y -= y || 0;
		return this;
	}
	/** Multiply coordinates by a number */
	multiply(m) {
		this.x *= m || 1;
		this.y *= m || 1;
		return this;
	}
	/** Set coordinates to absolute values */
	abs() {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	}
	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}
	reverse() {
		return this.multiply(-1);
	}
	normalize() {
		const vectorLength = this.getMagnitude();
		if (vectorLength === 0) {
			this.x = 0;
			this.y = 0;
			return this;
		}
		this.x = this.x / vectorLength;
		this.y = this.y / vectorLength;
		return this;		
	}
	setMagnitude(m) {
		return this.normalize().multiply(m);
	}
	setTangent() {
		return this.set(this.y, this.x);
	}

	//------------------------------------------ Get values
	getDistance({x, y}) {
		return Math.sqrt( Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2) );
	}
	getAbsoluteDistance(coords = {}) {
		return Math.abs(this.getDistance(coords));
	}
	getMagnitude() {
		return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2)	);
	}

	//------------------------------------------ Cloning - Returns a new object
	/** Create a copy of these coordinates (useful to avoid mutating a coordinates object) */
	clone() {
		return new Coords(this.x, this.y);
	}
	getMultiply(m) {
		return new Coords(this.x * m, this.y * m);
	}
	getUnitVector(coords = {}) {
		const d = this.getAbsoluteDistance(coords);
		if (d === 0) { return new Coords(0, 0); }
		const dx = coords.x - this.x;
		const dy = coords.y - this.y;
		const x = dx / d;
		const y = dy / d;
		return new Coords(x, y);
	}
	getUnitVectorTangent(coords = {}) {
		const d = this.getAbsoluteDistance(coords);
		if (d === 0) { return new Coords(0, 0); }
		const x = (coords.y - this.y) / d;
		const y = (this.x - coords.x) / d;
		return new Coords(x, y);
	}
	getPerpendicularVector(left = false) {
		return (left) ? new Coords(-1 * this.y, this.x) : new Coords(this.y, -1 * this.x);
	}
	getTangent() {
		return new Coords(this.y, this.x);
	}

	//------------------------------------------ Checks (True/False)
	/** Determine if the coordinates' x y values are valid numbers */
	check() {
		return (
			typeof this.x === 'number' && typeof this.y === 'number' &&
			!isNaN(this.x) && !isNaN(this.y)
		);
	}
	isEqual({x, y}) {
		return (this.x === x && this.y === y);
	}
	isEqualInteger({x, y}) {
		return (Math.round(this.x) === Math.round(x) && Math.round(this.y) === Math.round(y));
	}

	//------------------------------------------ Polar Coordinate Methods
	setByPolarCoords(r, theta) {
		return this.set({
			x: (r * Math.cos(theta)),
			y: (r * Math.sin(theta))
		}) ;
	};
	// static convertPolarToCartesianCoords(r, theta) {
	// 	var x = r * Math.cos(theta);
	// 	var y = r * Math.sin(theta);
	// 	return (new Coords(x, y));
	// };
	rotate(deltaTheta, aroundOriginCoords) {
		this.subtract(aroundOriginCoords);
		this.setByPolarCoords(this.r, (this.theta + deltaTheta));
		this.add(aroundOriginCoords);
		return this;
	};
	/** Get radius to the center (0,0) */
	getRadius() {
		return this.getDistance({x: 0, y: 0});
	}
	setRadius(r) {
		this.setByPolarCoords(r, this.getTheta());
		return this;
	}
	getTheta() {
		return Math.atan2(this.y, this.x); // http://stackoverflow.com/a/8898965/1766230
	}
	setTheta(theta) {
		this.setByPolarCoords(this.getRadius(), theta);
	}
	getDegrees() {
		return this.getTheta() * (180/Math.PI)
	}

	//------------------------------------------ Aliases
	equals(coords = {}) {
		return this.isEqual(coords);
	}
	copy() {
		return this.clone();
	}
	getCopy() {
		return this.clone();
	}
	getClone() {
		return this.clone();
	}
}

export default XY;
