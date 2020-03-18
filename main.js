
let canvas = document.getElementById("maincanvas");
let width = canvas.width;
let height = canvas.height;
let context = canvas.getContext("2d");

class Color{
    constructor(r=0,g=0,b=0){
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

class Vector{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Triangle{
    constructor(p1, p2, p3){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.color = new Color(255, 0, 0);
    }

    checkCollidePlane(cameraPos, direction){

        let planex;
        let planey;
        let planez;
        let t

        let pt = new Vector(10,10,10);
        if (pt){
            return ((pt.x-cameraPos.x)**2+(pt.y-cameraPos.y)**2+(pt.z-cameraPos.z)**2)
        }
        return; //not collided
    }

    checkCollideTriangle(Intersection){
        
        // let pt = new Vector(10,10,10);
        // if (pt){
        //     return ((pt.x-cameraPos.x)**2+(pt.y-cameraPos.y)**2+(pt.z-cameraPos.z)**2)
        // }
        // return; //not collided
    }
}


class Camera{
    constructor(){
        this.position = new Vector(0, 0, 0);
        this.resolutionX = 40; //hardcoded!
        this.resolutionY = 40; //hardcoded!
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
        let distance = triangle.checkCollide(this.position, direction); 
        if (distance){
            if(distance < closest){
                closest = distance;
                color = triangle.color;
            }
        }
    }

    return color;
}


let camera = new Camera();

let scene = [];

scene.push(new Triangle(new Vector(5,0,0), new Vector(0,5,0), new Vector(0,0,5)));


setInterval(function(){
    drawImage(camera.generateImage(scene));
}, 15)

function drawImage(image){
    for (let i = 0; i<image.length; i++){
        for (let j = 0; j<image[0].length; j++){
            context.fillStyle = 'rgb('+ image[j][i].r +',' + image[j][i].g +','+image[j][i].b + ')';
            context.fillRect(i*10, j*10, 9, 9);
        }
    }
}