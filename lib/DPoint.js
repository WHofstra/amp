class DPoint{

  constructor(position, radius, color1, color2, velocity, accell, grav, lineClr){
    this.position = position;
    this.radius = radius;

    this.color1 = color1;
    this.color2 = color2;

    this.velocity = velocity;
    this.accell = accell;

    this.grav = grav || false;
    this.lineClr = lineClr || "#000000";

    var originalVel = velocity.dy;
  }

  update(){
    this.position.add(new Vector2d(this.velocity.dx / 30, this.velocity.dy / 30));
  }

  draw(context){
    var grd = context.createRadialGradient(this.position.dx, this.position.dy, this.radius,
       this.position.dx - Math.floor(this.radius*0.8), this.position.dy - Math.floor(this.radius*0.8),
       Math.floor(this.radius/2));

    grd.addColorStop(0, this.color1);
    grd.addColorStop(1, this.color2);

    context.beginPath();
    context.strokeStyle = this.lineClr;
    context.fillStyle = grd;
    context.arc(this.position.dx, this.position.dy, this.radius,
      0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.closePath();
  }

  bounce(bound){
    if ((this.position.dy + this.radius) >= bound.dy || (this.position.dy - this.radius) <= 0){
      //this.position.sub(this.velocity);
      this.velocity.dy *= -1;
    }

    if ((this.position.dx + this.radius) >= bound.dx || (this.position.dx  - this.radius) <= 0){
      //this.position.sub(this.velocity);

      /*if (this.velocity.dy < 0.5 && this.velocity.dy > -0.5){
        this.velocity.dx = 0;
        this.velocity.dy = 0;
      }
      else
      {*/
        this.velocity.dx *= -1;
      //}
    }

    if (this.grav){
      this.velocity.dy += this.accell;
    }
  }
}
