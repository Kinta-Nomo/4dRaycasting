
import {Vector} from './vector.js';
import {Color} from './color.js';
import {scene} from './scene.js';

let canvas = document.getElementById("maincanvas");

const width = canvas.width;
const height = canvas.height;
let context = canvas.getContext("2d");
let res = 100;

class Camera{
    constructor(){
        this.position = new Vector(0, 0, 0);
        this.resolutionX = res; //hardcoded!
        this.resolutionY = res; //hardcoded!
    }

}
Camera.prototype.generateImage = function(scene){
    let image = [...Array(this.resolutionX)].map(emp => []);
    for (let i = 0; i < this.resolutionX; i++){
        for (let j = 0; j < this.resolutionY; j++){
            image[j][i] = this.castRay(new Vector(i-this.resolutionX/2,j-this.resolutionY/2,0), scene); //push color
        }
    }
    return image;
}
Camera.prototype.castRay = function(direction, scene){
    let color = new Color();
    let closest = Infinity;
    for (let triangle of scene){
        let distance = triangle.checkCollideTriangle(this.position, direction); 
        if (distance){
            if(distance < closest){
                closest = distance;
                let p = distance;
                color = new Color(triangle.color.r/distance*p, triangle.color.g/distance*p, triangle.color.b/distance*p);
            }
        }
    }

    return color;
}


let camera = new Camera();

setInterval(function(){
    drawImage(camera.generateImage(scene));
}, 15)

function drawImage(image){
    for (let i = 0; i<image.length; i++){
        for (let j = 0; j<image[0].length; j++){
            context.fillStyle = 'rgb('+ image[j][i].r +',' + image[j][i].g +','+image[j][i].b + ')';
            context.fillRect(i*width/res, j*width/res, width/res, height/res);
        }
    }
}


document.addEventListener( "keydown", function(key){
    // alert(9)
    let speed = 5;
    if (key.keyCode == 87){
        camera.position.z += speed
    }
    if (key.keyCode == 83){
        camera.position.z -= speed
    }
    if (key.keyCode == 65){
        camera.position.x += speed
    }
    if (key.keyCode == 68){
        camera.position.x -= speed
    }
    if (key.keyCode == 16){
        camera.position.y += speed
    }
    if (key.keyCode == 32){
        camera.position.y -= speed
    }
})