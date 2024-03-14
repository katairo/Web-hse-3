// Интерфейс для игрока (крестик, нолик или пусто)
type Player = 'X' | 'O' | null;

// Инициализация пустой доски
const initialBoard: Player[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

// Главный класс игры
class TicTacToe {
    private board: Player[][];
    private currentPlayer: Player;
    private container: HTMLElement | null;
    private isGameOver: boolean;

    constructor(containerId: string) {
        this.board = JSON.parse(JSON.stringify(initialBoard)); // Клонируем доску
        this.currentPlayer = 'X';
        this.container = document.getElementById(containerId);
        this.isGameOver = false;

        if (!this.container) {
            throw new Error(`Container element with id "${containerId}" not found.`);
        }

        // Отображение доски при инициализации
        this.render();
    }

    // Метод для обработки хода
    public makeMove(row: number, col: number): void {
        if (!this.isGameOver && this.board[row][col] === null) {
            this.board[row][col] = this.currentPlayer;
            // Проверяем результат игры после хода
            const result = this.checkWin();
            if (result) {
                this.isGameOver = true; // Игра завершена
                alert(result === 'draw' ? 'Ничья!' : `Игрок ${result} победил!`);
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
            // Обновляем отображение только если игра не завершена
            if (!this.isGameOver) {
                this.render();
            }
        }
    }

    // Метод для проверки на победу
    private checkWin(): Player | 'draw' | null {
        // Проверка победных комбинаций...
        // Ваша реализация проверки на победу
        return null; // Заглушка, чтобы TypeScript не ругался
    }

    // Метод для отрисовки текущего состояния доски
    private render(): void {
        if (!this.container) {
            return; // Проверяем, что контейнер существует
        }

        this.container.innerHTML = ''; // Очищаем содержимое контейнера
        this.board.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div'); // Создаем контейнер строки
            rowElement.classList.add('row'); // Добавляем класс "row" для стилизации
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.textContent = cell || ''; // Отображаем символ игрока или пустую строку
                // Добавляем обработчик клика для каждой клетки
                cellElement.addEventListener('click', () => {
                    this.makeMove(rowIndex, colIndex);
                });
                rowElement.appendChild(cellElement); // Добавляем клетку в контейнер строки
            });
            this.container?.appendChild(rowElement); // Добавляем контейнер строки в основной контейнер
        });
    }
}

// Пример использования класса
const game = new TicTacToe('board');
