function Attractor () {
    this.points = [];
    this.const1 = 10.0;
    this.const2 = 28;
    this.const3 = 8/3;

    this.x = 3.051522;
    this.y = 1.582542;
    this.z = 15.62388;

    this.createVar1 = function() {
        this.const1 = 5;
        this.const2 = 15;
        this.const3 = 1;
    }

    this.step = function() {
        var dt = 0.008
        var dX = (this.const1 * (this.y - this.x)) * dt;
        var dY = (this.x * (this.const2 - this.z) - this.y) * dt;
        var dZ = (this.x * this.y - this.const3 * this.z) * dt;

        var nX = this.x + dX;
        var nY = this.y + dY;
        var nZ = this.z + dZ;

        this.x = nX;
        this.y = nY;
        this.z = nZ;
        this.points.push({x: this.x, y: this.y, z: this.z});
    }
}