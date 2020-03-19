
import {Vector} from './vector.js';
import {Triangle} from './triangle.js';
import {Color} from './color.js';

let scene = [];

// scene.push(new Triangle(new Vector(5,0,1000), new Vector(0,5,1000), new Vector(0,0,1000)));
// for (let i = 0; i<100)
// scene.push(new Triangle(new Vector(5,0,0), new Vector(0,5,0), new Vector(0,0,5)));
scene.push(new Triangle(new Vector(3,0,5), new Vector(0,10,0), new Vector(5,9,0), new Color(255, 0, 255)));
scene.push(new Triangle(new Vector(5,0,0), new Vector(0,5,0), new Vector(5,5,2), new Color(255, 0, 0)));
scene.push(new Triangle(new Vector(-10,-10,-10), new Vector(10,-5,-5), new Vector(-10,10,9), new Color(0, 0, 255)));
scene.push(new Triangle(new Vector(1, -2, 1), new Vector(4, -2, -2), new Vector(4, 1, 4), new Color(0, 255, 255)));

export {scene};