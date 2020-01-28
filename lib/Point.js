class Point {

    constructor(position, radius, color1, color2, char, draggable, lineClr1, lineClr2){
      this.position = position;
      this.radius = radius;
      this.color1 = color1;
      this.color2 = color2;
      this.char = char;
      this.draggable = draggable || false;
      this.lineClr1 = lineClr1 || "#000000";
      this.lineClr2 = lineClr2 || "#000000";
      //console.log(draggable);

      if (this.draggable){
        this.drag();
      }
    }

    draw(context){
      var grd = context.createRadialGradient(this.position.dx, this.position.dy, this.radius,
         this.position.dx - Math.floor(this.radius*0.8), this.position.dy - Math.floor(this.radius*0.8),
         Math.floor(this.radius/2));

      grd.addColorStop(0, this.color1);
      grd.addColorStop(1, this.color2);
      //grd.addColorStop(0, "rgb(255, 166, 0)");
      //grd.addColorStop(1, "rgb(166, 255, 0)");

      context.beginPath();
      //context.lineWidth = "5";
      context.strokeStyle = "#000000";
      context.fillStyle = grd;
      //context.fillStyle = "rgba(255, 166, 0, 0.8)";
      context.arc(this.position.dx, this.position.dy, this.radius,
        0, 2 * Math.PI);
      context.stroke();
      context.strokeStyle = this.lineClr1;
      context.fill();
      context.fillStyle = this.lineClr1;
      context.font = "20px Calibri Light";
      //context.fillText(this.char, this.position.dx - 10, this.position.dy + 5);
      //context.strokeText(this.char, this.position.dx - 10, this.position.dy + 5);

      context.fillText(this.char, this.position.dx + this.radius, this.position.dy + this.radius);
      context.strokeText(this.char, this.position.dx + this.radius, this.position.dy + this.radius);

      context.strokeStyle = this.lineClr2;
      context.closePath();
    }

    drag(){
      let dragging = false;

      window.addEventListener('mousedown', (evt)=>{
        let mouse = new Vector2d(evt.clientX, evt.clientY);
        let difference = new Vector2d(0, 0);
        difference.differenceVector(this.position, mouse);
        if (difference.magnitude < this.radius){
          dragging = true;
        }
      });

      window.addEventListener('mousemove', (evt)=>{
        if (dragging){
          this.position.dx = evt.clientX;
          this.position.dy = evt.clientY;

        }
      });

      window.addEventListener('mouseup', ()=>{
        dragging = false;
      });
    }
}
