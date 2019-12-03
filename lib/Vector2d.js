class Vector2d{
    constructor(dx, dy){
        this.dx = dx;
        this.dy = dy;
    }

    get magnitude(){
      return Math.sqrt(this.dx*this.dx + this.dy*this.dy);
    }

    differenceVector(a, b){
      this.dx = a.dx - b.dx;
      this.dy = a.dy - b.dy;
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
}
