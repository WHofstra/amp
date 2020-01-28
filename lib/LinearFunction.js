class LinearFunction{

    constructor(slope, intercept){
      this.slope = slope;
      this.intercept = intercept;

      //let thisX;
      //let nextX;
    }

    calcY(x){
      return this.slope * x + this.intercept;
    }

    defineLineByTwoPoints(A, B){
      this.slope = (B.position.dy - A.position.dy)/(B.position.dx - A.position.dx);
      this.intercept = A.position.dy - this.slope*A.position.dx;
      //this.thisX = A.position.dx;
      //this.nextX = B.position.dx;
    }

    draw(context){
      context.beginPath();
      //context.moveTo(this.thisX, this.calcY(this.thisX));
      //context.lineTo(this.nextX, this.calcY(this.nextX));
      context.moveTo(0, this.calcY(0));
      context.lineTo(canvas.width, this.calcY(canvas.width));
      context.closePath();
      context.stroke();
    }
}
