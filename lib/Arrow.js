class Arrow {

    constructor(position, arrowLength, height, color1, color2, color3, color4, angle, followMouse){
      this.position = position;

      //arrowLength = Vector2d(shaftLength, headLength)
      this.shaftLength = arrowLength.dx;
      this.headLength = arrowLength.dy;

      //height = Vector2d(shaftHeight, headHeight)
      this.shaftHeight = height.dx;
      this.headHeight = height.dy;

      this.color1 = color1;
      this.color2 = color2;
      this.color3 = color3;
      this.color4 = color4;

      this.angle = angle || 0;
      this.followMouse = followMouse || false;

      if (followMouse){
        this.checkMouse();
      }
    }

    draw(context){
      var grd1 = context.createLinearGradient(0, 0,
          (this.shaftLength + this.headLength + 40), 0);
      grd1.addColorStop(0, this.color1);
      grd1.addColorStop(1, this.color2);

      var grd2 = context.createLinearGradient(0, 0,
          (this.shaftLength + this.headLength + 40), 0);
      grd2.addColorStop(0, this.color3);
      grd2.addColorStop(1, this.color4);

      context.save();
      context.translate(this.position.dx, this.position.dy);

      //Arrow
      context.beginPath();
      context.fillStyle = grd1;

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

      context.lineWidth = 2;
      context.strokeStyle = grd2;

      context.closePath();
      context.fill();
      context.stroke();
      context.restore();
    }

    checkMouse(){
      let mousePos = new Vector2d(0, 0);
      let difference = new Vector2d(0, 0);

      window.addEventListener('mousemove', (evt)=>{
         mousePos.dx = evt.clientX;
         mousePos.dy = evt.clientY;
         difference.dx = mousePos.dx - this.position.dx;
         difference.dy = mousePos.dy - this.position.dy;

         if (difference.dx > 0 && difference.dy > 0){
           this.angle = Math.atan(difference.dy / difference.dx) *
                              ((15 + Math.PI) * Math.PI);
         }
         else if (difference.dx < 0 && difference.dy > 0){
           this.angle = Math.atan(-difference.dx / difference.dy) *
                              ((15 + Math.PI) * Math.PI) + 90;
         }
         else if (difference.dx < 0 && difference.dy < 0){
           this.angle = Math.atan(difference.dy / difference.dx) *
                              ((15 + Math.PI) * Math.PI) + 180;
         }
         else if (difference.dx > 0 && difference.dy < 0){
           this.angle = Math.atan(difference.dx / -difference.dy) *
                              ((15 + Math.PI) * Math.PI) + 270;
         }
         else {

         }
      });
    }
}
