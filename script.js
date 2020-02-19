
var canvas = document.getElementById('game');

var context = canvas.getContext('2d');

var grid = 16;

var count = 0;

var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    length: 4
};

var apple = {
    x: 320,
    y: 320
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    // Игровой код выполнится только один раз из четырёх для замедления кадров, а пока переменная count меньше четырёх, код выполняться не будет
    if (++count < 4) {
        return;
    }
    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);

    snakeMovement();

    drawFood();

    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        drawSnake(cell)

        checkFoodEaten(cell);

        checkGameOver(cell, index);
    });
}

function snakeMovement(){
    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.length) {
        snake.cells.pop();
    }
}

function drawFood(){
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
}

function drawSnake(cell){
    // Чтобы создать эффект клеточек, делаем зелёные квадратики меньше на один пиксель, чтобы вокруг них образовалась чёрная граница
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
}

function checkFoodEaten(cell){
    if (cell.x === apple.x && cell.y === apple.y) {
        snake.length++;

        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
    }
}

function checkGameOver(cell, index){
    for (var i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.length = 4;
            snake.dx = grid;
            snake.dy = 0;

            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }
    }
}

function snakeControl(e){
    // Стрелка вверх
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }

    // Стрелка вверх
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }

    // Стрелка вправо
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }

    // Стрелка вниз
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
}

document.addEventListener('keydown', snakeControl);
requestAnimationFrame(gameLoop);