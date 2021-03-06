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

    // Создает вектор из массива.
    // Вектор будет иметь 1 колонку и столько же строк, сколько исходный массив
    static vectorFromArray(array) {
        let m = new Matrix(array.length, 1);
        m.each((x, i) => array[i]);
        return m;
    }

    toArray() {
        return this.data.slice();
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
        return x*this.cols + y;
    }

    // Печатет значения матрицы в консоль
    print() {
        let result = "";
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result += this.getItem(i, j) + " ";
            }
            result += "\n";
        }
        console.log(result);
    }

    // Заполняет матрицу случайными значениями от -1 до 1
    randomize() {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = Math.random() * 2 -1;
        }
    }

    // Перемножает две матрицы. Возвращает новый объект Matrix
    static multiply (a, b) {
        if (!(a instanceof Matrix) || !(b instanceof Matrix)) {
            throw "Unsupported argument type"
        }
        if (a.cols != b.rows) {
            throw "Incorrect matrix size"
        }

        let result = new Matrix(a.rows, b.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < b.cols; j++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.getItem(i, k) * b.getItem(k, j);
                }
                result.setItem(i, j, sum);
            }
        }
        return result;
    }

    // Возвращает новую транспонираванную матрицу.
    static transpose (a) {
        if(!(a instanceof Matrix)) {
            throw "Unsupported argument type"
        }

        let result = new Matrix(a.cols, a.rows);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                let val = a.getItem(i, j);
                result.setItem(j, i, val);
            }
        }

        return result;
    }

    // Умножает матрицу на число (скалирование матрицы)
    multiply(n) {
        if(isNaN(n)) {
            throw "Usupported argument type";
        }

        this.each((x) => x *= n);
    }

    // Добавляет число к матрице
    // или складывает 2 матрицы поэлементно
    add(n) {
        if(n instanceof Matrix) {
            if(n.data.length != this.data.length) {
                throw "Matrix length should be the same!";
            }
            this.each((x, i) => x += n.data[i]);
        }
        else if (!isNaN(n)) {
            this.each((x) => x += n);
        }
        else {
            throw "Usupported argument type";
        }
    }

    // Применяет переданную функцию к каждому элементу матрицы
    // Ф-ция должна принимать число и возвращать число
    // Опционально в ф-цию передается так же индекс элемента в одномерном массиве
    each (func) {
        if(typeof func != 'function') {
            throw "Usupported argument type";
        }

        for (let i = 0; i < this.data.length; i++) {
            let val = this.data[i];
            this.data[i] = func(val, i);
        }
    }

    // Поэлементно вычитает из одной матрицы другую
    // возвращает новую матрицу
    static subtract (a ,b) {
        if(!(a instanceof Matrix) || !(b instanceof Matrix)) {
            throw "Usupported argument type";
        }
        else if (a.rows != b.rows || a.cols != b.cols) {
            throw "Matrixes should have same size";
        }

        let result = new Matrix(a.rows, a.cols);
        result.each((x, i) => a.data[i] - b.data[i]);
        return result;
    }
}