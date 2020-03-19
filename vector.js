
export function Vector(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
}
export function subtract(vector1, vector2){
    return new Vector(vector1.x-vector2.x, vector1.y-vector2.y, vector1.z-vector2.z);
}
export function cross(vector1, vector2){
    let x = (vector1.y*vector2.z)-(vector1.z*vector2.y);
    let y = (vector1.z*vector2.x)-(vector1.x*vector2.z);
    let z = (vector1.x*vector2.y)-(vector1.y*vector2.x);
    return new Vector(x, y, z);
}
export function dot(vector1, vector2){
    let x = vector1.x*vector2.x;
    let y = vector1.y*vector2.y;
    let z = vector1.z*vector2.z;
    return x+y+z;
}
export function add(vector1, vector2){
    return new Vector(vector1.x+vector.x, vector1.y+vector2.y, vector1.z+vector2.z);
}
