// Описывает двумерную матрицу
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.data = new Array(rows * cols);
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = 0;
        }
    }

    // Получить значение по координатам x, y
    getItem(x, y) {
        let index = this.getItemIndex(x, y);
        return this.data[index];
    }

    // Задать значение по координатам x, y
    setItem(x, y, value) {
        let index = this.getItemIndex(x, y);
        this.data[index] = value;
    }

    // Переводит x и y в координаты одномерного массива,
    // хранящего данные
    getItemIndex(x, y) {
        if(x >= this.rows || y >= this.cols)
            throw "Index is out of rannge!";
        return x*(this.rows-1) + y;
    }

    // Печатет значения матрицы в консоль
    print() {
        let result = "";
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result += this.data[this.getItemIndex(i,j)] + " ";
            }
            result += "\n";
        }
        console.log(result);
    }

    // Умножает матрицу на число (скалирование матрицы)
    multiply(n) {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] *= n;
        }
    }

    // Добавляет число к матрице
    add(n) {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] += n;
        }
    }
}