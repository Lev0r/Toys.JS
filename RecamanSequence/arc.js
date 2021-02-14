function Arc(x, size, color, dir) {
    this.x = x;
    this.diameter = size;
    this.color = color;
    this.dir = dir;

    this.show = function() {
        stroke(this.color.r, this.color.g, this.color.b);

        if(dir == 0 ) arc(this.x, 0, this.diameter, this.diameter, 0, PI);
        else arc(this.x, 0, this.diameter, this.diameter, PI, 0);
    }
}