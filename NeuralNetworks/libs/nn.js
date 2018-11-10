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
        this.output_bias.randomize();

        this.output_weights = new Matrix(this.output_count, input_count);
        this.output_weights.randomize();
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

        // Пересоздаем output слой чтобы присоединить его к добавленному
        this.output_weights = new Matrix(this.output_count, layer_lenght);
        this.output_weights.randomize();
    }

    // Прямой ход нейронной сети.
    feedForward (input) {
        let inputs = this.getVectorFromArgument(input, this.input_count);

        // Вычисляем значения для каждого скрытого слоя
        let prev_layer = inputs;
        for (let i = 0; i < this.hidden_layers_count; i++) {
            // Умножаем матрицу весов на вектор предыдущего умножения
            let hidden = Matrix.multiply(this.hidden_weights[i], prev_layer);
            // добавляем смещение
            hidden.add(this.hidden_biases[i]);
            // Применяем функцию активации (нормализируем значения)
            hidden.each(this.sigmoid);
            // результат - новый вектор
            prev_layer = hidden;
        }

        // Вычисляем значения для выходного слоя
        let outputs = Matrix.multiply(this.output_weights, prev_layer);
        outputs.add(this.output_bias);
        outputs.each(this.sigmoid);

        // Приводим результат к массиву
        return outputs.toArray();
    }

    // Обратное распространение ошибки
    train (input, answer) {
        let answers = this.getVectorFromArgument(answer, this.output_count);
        let outputs = Matrix.vectorFromArray(this.feedForward(input));

        // Вычисляем ошибку для выходного слоя
        let nn_errors = Matrix.subtract(answers, outputs);

        // Вычисляем ошибку для последнего скрытого слоя
        let output_weights_t = Matrix.transpose(this.output_weights);
        let prev_errors = Matrix.multiply(output_weights_t, nn_errors);

        // Вычисляем ошибки для каждого скрытого слоя в обратном порядке
        for (let i = this.hidden_layers_count - 1; i >= 0; i --) {
            let h_t = Matrix.transpose(this.hidden_weights[i]);
            let h_errors = Matrix.multiply(h_t, prev_errors);
        }
    }

    getVectorFromArgument(argument, expected_length) {
        // Проверка входных параметров и конвертация в необходимый формат
        let result;
        if (argument instanceof Matrix) {
            if(argument.data.length != expected_length) {
                throw "Invalid argument lenght";
            }
            result = argument;
        }
        else if (Array.isArray(argument)) {
            if(argument.length != expected_length) {
                throw "Invalid argument lenght";
            }
            result = Matrix.vectorFromArray(argument);
        }
        else {
            throw "Unsupported argument type";
        }

        return result;
    }
}
