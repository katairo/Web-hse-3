// Инициализация пустой доски
var initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
// Главный класс игры
var TicTacToe = /** @class */ (function () {
    function TicTacToe(containerId) {
        this.board = JSON.parse(JSON.stringify(initialBoard)); // Клонируем доску
        this.currentPlayer = 'X';
        this.container = document.getElementById(containerId);
        this.isGameOver = false;
        if (!this.container) {
            throw new Error("Container element with id \"".concat(containerId, "\" not found."));
        }
        // Отображение доски при инициализации
        this.render();
    }
    // Метод для обработки хода
    TicTacToe.prototype.makeMove = function (row, col) {
        if (!this.isGameOver && this.board[row][col] === null) {
            this.board[row][col] = this.currentPlayer;
            // Проверяем результат игры после хода
            var result = this.checkWin();
            if (result) {
                this.isGameOver = true; // Игра завершена
                alert(result === 'draw' ? 'Ничья!' : "\u0418\u0433\u0440\u043E\u043A ".concat(result, " \u043F\u043E\u0431\u0435\u0434\u0438\u043B!"));
            }
            else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
            // Обновляем отображение только если игра не завершена
            if (!this.isGameOver) {
                this.render();
            }
        }
    };
    // Метод для проверки на победу
    TicTacToe.prototype.checkWin = function () {
        // Проверка победных комбинаций...
        // Ваша реализация проверки на победу
        return null; // Заглушка, чтобы TypeScript не ругался
    };
    // Метод для отрисовки текущего состояния доски
    TicTacToe.prototype.render = function () {
        var _this = this;
        if (!this.container) {
            return; // Проверяем, что контейнер существует
        }
        this.container.innerHTML = ''; // Очищаем содержимое контейнера
        this.board.forEach(function (row, rowIndex) {
            var _a;
            var rowElement = document.createElement('div'); // Создаем контейнер строки
            rowElement.classList.add('row'); // Добавляем класс "row" для стилизации
            row.forEach(function (cell, colIndex) {
                var cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.textContent = cell || ''; // Отображаем символ игрока или пустую строку
                // Добавляем обработчик клика для каждой клетки
                cellElement.addEventListener('click', function () {
                    _this.makeMove(rowIndex, colIndex);
                });
                rowElement.appendChild(cellElement); // Добавляем клетку в контейнер строки
            });
            (_a = _this.container) === null || _a === void 0 ? void 0 : _a.appendChild(rowElement); // Добавляем контейнер строки в основной контейнер
        });
    };
    return TicTacToe;
}());
// Пример использования класса
var game = new TicTacToe('board');
