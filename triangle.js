import {add, subtract, cross, dot, Vector} from './vector.js';

export class Triangle{
    constructor(p1, p2, p3, color){
        //three vectors
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.color = color;
        this.normal = cross(subtract(p2, p1), subtract(p3, p1))//*used to check the intersection point!
        this.offset = this.normal.x*this.p1.x+this.normal.y*this.p1.y+this.normal.z*this.p1.z;//d corresponding to ax + by + cz + d
    }

    checkCollidePlane(C, P){

        //ax+by+cz+d=0
        let a = this.normal.x
        let b = this.normal.y
        let c = this.normal.z
        let d = this.offset;
        
        //I = (1-t)C + tP, where C is the camera and P is the direction vector
        //a*Cx - a*Cx*t + a*Px*t  +  b*Cy - b*Cy*t + b*Py*t  +  c*Cz - c*Cz*t + c*Pz*t
        // - a*Cx*t + a*Px*t - b*Cy*t + b*Py*t - c*Cz*t + c*Pz*t = 0 - a*Cx - b*Cy - c*Cz - d
        // t (- a*Cx + a*Px - b*Cy + b*Py - c*Cz + c*Pz) = 0 - a*Cx - b*Cy - c*Cz - d
        let den = (- a*C.x + a*P.x - b*C.y + b*P.y - c*C.z + c*P.z)
        if (den){
            let t = (0 - C.x*a - C.y*b - C.z*c - d) / den;
            let I = new Vector((1-t)*C.x + t*P.x, (1-t)*C.y + t*P.y, (1-t)*C.z + t*P.z);
            return I;
        }
        return; //ray and plane parallel
    }

    checkCollideTriangle(C, P){
        let I = this.checkCollidePlane(C, P)
        if (!I){
            // console.log(I);
            return;
        }
        
        let u = subtract(this.p2, this.p1)
        let v = subtract(this.p3, this.p1)
        let w = subtract(I, this.p1);
        // console.log([u,v,w]);

        let uv = dot(u,v);
        let wv = dot(w,v);
        let vv = dot(v,v);
        let wu = dot(w,u);
        let uu = dot(u,u);
        // console.log([uv,wv,,vv,wu,uu]);

        let den = uv**2-uu*vv
        if (den){
            let s = (uv*wv-vv*wu)/den
            let t = (uv*wu-uu*wv)/den
            // console.log([s,t]);
            if (s >= 0 && t >= 0 && s+t<=1){
                // console.log((I.x-C.x)**2+(I.y-C.y)**2+(I.z-C.z)**2);
                return ((I.x-C.x)**2+(I.y-C.y)**2+(I.z-C.z)**2)
            }
        }
        return;
    }
}