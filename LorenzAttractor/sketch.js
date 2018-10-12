var attractor;
var angle = 0;
var hu = 0;


function setup() {
    createCanvas(500, 500, WEBGL);
    colorMode(HSB, 255, 255, 255);
    attractor = new Attractor();
    //attractor.createVar1();
}

function draw() {
    background(20);
    scale(3.5);
    attractor.step();
    angle += 0.01;

    rotate(angle, [2,1.5,1]);
    noFill();

    stroke(hu, 255, 255);
    beginShape();
    for (var i = 0; i < attractor.points.length; i++){
        c = attractor.points[i];
        vertex(c.x, c.y, c.z);
        
    }
    endShape();

    hu += 0.1;
    if(hu >= 255){
        hu = 0;
    }
}