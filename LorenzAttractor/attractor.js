function Attractor (size, speed) {
    this.points = [];
    this.size = size;
    this.dt = speed*0.01;

    this.initDefault = function () {
        this.const1 = 10;
        this.const2 = 28;
        this.const3 = 8/3;

        this.x = 3.051522;
        this.y = 1.582542;
        this.z = 15.62388;
    };

    this.initVar1 = function() {
        this.const1 = 5;
        this.const2 = 15;
        this.const3 = 1;

        this.x = 1;
        this.y = 0;
        this.z = 0;
    };

    this.generate = function() {

        for (var i =0; i< size; i++)
        {
            var dX = (this.const1 * (this.y - this.x)) * this.dt;
            var dY = (this.x * (this.const2 - this.z) - this.y) * this.dt;
            var dZ = (this.x * this.y - this.const3 * this.z) * this.dt;

            this.x += dX;
            this.y += dY;
            this.z += dZ;

            this.points.push({x: this.x, y: this.y, z: this.z});
        }
    };
}