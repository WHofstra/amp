class Arrow {

    constructor(position, arrowLength, height, color1, color2, angle){
      this.position = position;

      //arrowLength = Vector2d(shaftLength, headLength)
      this.shaftLength = arrowLength.dx;
      this.headLength = arrowLength.dy;

      //height = Vector2d(shaftHeight, headHeight)
      this.shaftHeight = height.dx;
      this.headHeight = height.dy;

      this.color1 = color1;
      this.color2 = color2;

      this.angle = angle || 0;
    }

    draw(context){
      var grd = context.createLinearGradient(0, 0,
          (this.shaftLength + this.headLength + 40), 0);
      grd.addColorStop(0, this.color1);
      grd.addColorStop(1, this.color2);

      /*if (this.angle > 360){
        this.angle -= 360;
      }
      else if (this.angle < 0){
        this.angle += 360;
      }*/

      context.save();
      context.translate(this.position.dx, this.position.dy);

      //Arrow
      context.beginPath();
      context.fillStyle = grd;

      context.rotate(this.angle * Math.PI / 180);

      context.moveTo(0, 0);
      context.lineTo(0, -(this.shaftHeight/2));
      context.lineTo(this.shaftLength, -(this.shaftHeight/2));
      context.lineTo(this.shaftLength, -(this.headHeight/2));
      context.lineTo((this.shaftLength + this.headLength), 0);
      context.lineTo(this.shaftLength, (this.headHeight/2));
      context.lineTo(this.shaftLength, (this.shaftHeight/2));
      context.lineTo(0, (this.shaftHeight/2));
      context.lineTo(0, 0);

      context.closePath();
      context.stroke();
      context.fill();
      context.restore();
    }
}
