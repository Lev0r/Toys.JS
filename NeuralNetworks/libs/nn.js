// Описывает "Полносвязанный" мультислойный персептрон
class MultiLayerPerceptron {
    constructor(input_count, output_count) {
        // Запоминаем кол-во нод в входном массиве и выходном
        this.input_count = input_count;
        this.output_count = output_count;

        // Инициализируем массивы для скрытых слоев
        this.hidden_weights  = new Array();
        this.hidden_biases  = new Array();
        this.hidden_layers_count = 0;

        // Создаем матрицы смещения для выходных данных
        this.output_bias = new Matrix(this.output_count, 1);
    }


    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    // Создает трехслойный персептрон с заданным кол-вом входных параметров,
    // нейронов на скрытом слое и выходных данных
    static createThreeLayer (input_count, hidden_count, output_count) {
        var nn = new MultiLayerPerceptron(input_count, output_count);
        nn.addHiddenLayer(hidden_count);
        return nn;
    }

    // Добавляет скрытый слой с заданным количеством нодов
    addHiddenLayer (layer_lenght) {
        // Вычисляем кол-во нод на предыдущем слое.
        // Если это первый скрытый слой, берем кол-во входных нодов
        let previous_layer_length = this.input_count
        if(this.hidden_layers_count != 0) {
            previous_layer_length = this.hidden_weights[this.hidden_layers_count - 1].rows;
        }

        // Создаем новую матрицу, заполняем ее случайными значениями и добавляем в массив
        let matrix = new Matrix(layer_lenght, previous_layer_length);
        matrix.randomize();
        this.hidden_weights.push(matrix);

        // Создаем матрицу смещения для скрытого слоя
        let bias = new Matrix(layer_lenght, 1);
        bias.randomize();
        this.hidden_biases.push(bias)

        // Увеличиваем счетчик количества скрытых слоев
        this.hidden_layers_count ++;
    }

    feedForward (input_array) {
        let input;
        if (input_array instanceof Matrix) {
            input = input_array;
        }
        else if (Array.isArray(input_array)) {
            input = Matrix.vectorFromArray(input_array);
        }
        else {
            throw "Unsupported argument type";
        }

        let prev_layer = input;
        for (let i = 0; i < this.hidden_layers_count; i++) {
            let hidden = Matrix.multiply(this.hidden_weights[0], prev_layer);
            hidden.add(this.hidden_biases[0]);
            hidden.each(this.sigmoid);
            prev_layer = hidden;
        }
    }
}
