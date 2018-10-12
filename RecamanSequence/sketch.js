var seq = [];
var history = [];
var hop = 1;
var pos = 0;
var arcs = [];
var biggestPos =0;
var hu = 0;

function setup() {
    createCanvas(800, 600);
    history[pos] = true;
    seq.push(pos);
    colorMode(HSB, 255, 255, 255)
}

function step() {
    var nextPos = pos - hop;
    if(nextPos < 0 || history[nextPos]) {
        nextPos = pos + hop;
    }

    var halfDist = (nextPos - pos) / 2;
    var arc = new Arc(pos + halfDist, hop, {r:hu, g:255, b:255}, hop % 2);
    arcs.push(arc);

    pos = nextPos;
    history[pos] = true;
    seq.push(pos);

    if(biggestPos < pos) biggestPos = pos;

    if(hu >= 255) hu =0;

    hop ++;
    hu++;
}

function draw() {
    background(20);
    step();
    translate(0, height/2);
    noFill();
    scale(width / biggestPos);

    for (var i=1; i < arcs.length; i++) {
        arcs[i].show();
    }
}