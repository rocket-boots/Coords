# Coords: Simple classes for handling coordinates math

## Install

* Clone the repo, or...
* `npm install https://github.com/rocket-boots/Coords#master`

## Use

- For ES6 modules, use any of the files ending in `.mjs`, including `index.mjs`.
- For CommonJS, use `index.cjs` (built w/ webpack).

### Coords

- Instantiate a new coordinates object with x and y values: `new Coords(x, y)`.
- See all the methods in https://github.com/rocket-boots/Coords/blob/master/src/Coords.js

#### Examples

```javascript
	import Coords from 'Coords.js';

	const position = new Coords(1, 2);
	console.log('x =', position.x, 'y =', position.y); // x = 1, y = 2

	const target = new Coords(42, 42);
	const distance = position.getDistance(target); // 57.28001...
	const unitVectorPointedAtTarget = position.getUnitVector(target); // {x: 0.71578..., y: 0.69832...}
	const angle = pointToTarget.getTheta(); // 0.77305... radians (about 44.3 degrees)

	const newPosition = position.clone() // makes a copy of the object
		.add({x: 99, y: 0}) // add another Coords-like object to this one
		.multiply(2); // multiply all coordinates ... Final result: x = 200, y = 4
```



## Development

- Run `npm run build` to build the CommonJS version.
- Please submit issues or pull requests if you'd like to see changes or fixes.

