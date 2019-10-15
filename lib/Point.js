class Point {

    constructor(position, radius, color1, color2, char, draggable){
      this.position = position;
      this.radius = radius;
      this.color1 = color1;
      this.color2 = color2;
      this.char = char;
      this.draggable = false || draggable;
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
      context.strokeStyle = "rgb(75, 0, 255)";
      context.fillStyle = grd;
      //context.fillStyle = "rgba(255, 166, 0, 0.8)";
      context.arc(this.position.dx, this.position.dy, this.radius,
        0, 2 * Math.PI);
      context.stroke();
      context.fill();
      context.fillStyle = "rgb(0, 0, 0)";
      context.font = "15px Calibri Light";
      context.fillText(this.char, this.position.dx, this.position.dy + 30);
      context.strokeText(this.char, this.position.dx, this.position.dy + 30);
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

        //console.log(mouse);
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
