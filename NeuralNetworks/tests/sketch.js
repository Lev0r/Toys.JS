function setup() {
    let a = new Matrix(5, 7);
    let b = new Matrix(7, 3);

    a.randomize();
    b.randomize();

    a.print();
    b.print();

    let c = Matrix.multiply(a, b);
    c.print();

    console.log("----------------------------------");
    a.print();
    let d = Matrix.transpose(a);
    d.print();
}

function draw() {
}