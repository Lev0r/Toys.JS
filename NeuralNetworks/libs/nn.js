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
    }

    feedForward (input_array) {
        // Проверка взодных параметров и конвертация в необходимый формат
        let input;
        if (input_array instanceof Matrix) {
            if(input_array.data.length != this.input_count) {
                throw "Input length is not equal to network input nodes count";
            }
            input = input_array;
        }
        else if (Array.isArray(input_array)) {
            if(input_array.length != this.input_count) {
                throw "Input length is not equal to network input nodes count";
            }
            input = Matrix.vectorFromArray(input_array);
        }
        else {
            throw "Unsupported argument type";
        }

        // Вычисляем значения для каждого скрытого слоя
        let prev_layer = input;
        for (let i = 0; i < this.hidden_layers_count; i++) {
            // Умножаем матрицу весов на вектор предыдущего умножения
            let hidden = Matrix.multiply(this.hidden_weights[0], prev_layer);
            // добавляем смещение
            hidden.add(this.hidden_biases[0]);
            // Применяем функцию активации (нормализируем значения)
            hidden.each(this.sigmoid);
            // результат - новый вектор
            prev_layer = hidden;
        }

        // Вычисляем значения для выходного слоя
        let output = Matrix.multiply(this.output_weights, prev_layer);
        output.add(this.output_bias);
        output.each(this.sigmoid);

        // Приводим результат к массиву
        return output.toArray();
    }
}
