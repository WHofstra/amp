class Vector2d{
    constructor(dx, dy){
        this.dx = dx;
        this.dy = dy;
    }

    get magnitude(){
      return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }

    set magnitude(newMagnitude){
      let tAngle = Math.atan(this.dy / this.dx);
      this.dx = newMagnitude * Math.cos(tAngle);
      this.dy = newMagnitude * Math.sin(tAngle);
    }

    differenceVector(a, b){
      this.dx = a.dx - b.dx;
      this.dy = a.dy - b.dy;
    }

    equals(a) {
      this.dx = a.dx;
      this.dy = a.dy;
    }

    scalarMul(a){
      this.dx *= a;
      this.dy *= a;
    }

    add(vector){
      this.dx += vector.dx;
      this.dy += vector.dy;
    }

    sub(vector){
      this.dx -= vector.dx;
      this.dy -= vector.dy;
    }

    dot(vector){
      return (this.dx * vector.dx + this.dy * vector.dy);
    }

    perpendicular(vector){
      this.dx = -vector.dy;
      this.dy = vector.dx;
    }
}
