function setup() {
    let nn = MultiLayerPerceptron.createThreeLayer(2, 2, 1);
    let input = [1, 0];
    let output = nn.feedForward(input);
    console.log(output);
}

function draw() {
}