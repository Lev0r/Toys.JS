function setup() {
    let a = new Matrix(5, 7);
    let b = new Matrix(7, 5);

    a.randomize();
    b.randomize();

    a.print();
    b.print();
    a.add(b);
    a.print();
}

function draw() {
}