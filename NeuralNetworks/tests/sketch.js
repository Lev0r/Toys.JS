function setup() {
    let nn2 = new MultiLayerPerceptron(3, 3);
    nn2.addHiddenLayer(4);
    nn2.addHiddenLayer(3);
    nn2.addHiddenLayer(2);

    nn2.train([55, 44, 33], [1, 0, 1]);
}

function draw() {
}