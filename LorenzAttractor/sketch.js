var attractor;
var angle = 0;
var hu = 0;
var isGrowing = true;
var currentPoint = 0;


function setup() {
    createCanvas(500, 500, WEBGL);
    colorMode(HSB, 255, 255, 255);
    attractor = new Attractor(5000, 1);
    attractor.initDefault();
    attractor.generate();
    //attractor.createVar1();
}

function draw() {
    background(20);
    scale(3.5);
    angle += 0.01;

    rotate(angle, [2,1.5,1]);
    noFill();

    stroke(hu, 255, 255);
    beginShape();
    for (var i = 0; i < currentPoint; i++){
        c = attractor.points[i];
        vertex(c.x, c.y, c.z);
        
    }
    endShape();

    if(isGrowing)
        currentPoint ++;
    else
        currentPoint --;

    if(currentPoint == attractor.points.length)
        isGrowing = false;
    else if(currentPoint == 0)
        isGrowing = true

    hu += 0.1;
    if(hu >= 255){
        hu = 0;
    }
}