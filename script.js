class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width = 288;
        this.canvasHeight = this.canvas.height = 512;
        this.deltaTime = 10;
        this.speed = this.deltaTime * 0.3;
        this.baseHeight = 80;
        this.gameSpace = this.canvasHeight - this.baseHeight;
        this.timer = 0;
        this.interVal = 1500;
        this.score = new Score(this);
        this.gameScore = 0;
        this.gameStart = false;
        this.gameOver = false;

        this.input = new InputHandler(this);
        this.bg = new Bg(this);
        this.base = new Base(this);
        this.bird = new Bird(this);
        this.gameOverScreen = new GameOver(this);
        this.startScreen = new StartScreen(this);
        this.pipes = [];

        this.audioSwoosh = new Audio();
        this.audioSwoosh.src = "assets/audio/swoosh.ogg";
        this.audioDie = new Audio();
        this.audioDie.src = "assets/audio/die.ogg";
        this.audioPoint = new Audio();
        this.audioPoint.src = "assets/audio/point.mp3";

        this.update(0);
    }

    #createPipe() {
        this.pipes.push(new Pipe(this));
        this.pipes = this.pipes.filter((pipe) => !pipe.markedForDeletion);
    }

    #splitScore(score) {
        if (typeof score !== "number") return [];
        let last = score;
        const results = [];
        while (true) {
            const curr = last % 10;
            results.push(curr);
            if (last === curr) break;
            last = (last - curr) / 10;
        }
        return results.reverse();
    }

    #handleDrawScore() {
        this.#splitScore(this.gameScore).forEach((score, index) => {
            const x = index * (this.score.width + 2);
            this.score.draw(score, x + 10, 10);
        });
    }

    #lastTime = 1;
    update(timeStamp) {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        if (this.gameStart) {
            if (!this.gameOver) {
                this.deltaTime = timeStamp - this.#lastTime;
                this.#lastTime = timeStamp;
                if (this.timer > this.interVal) {
                    this.#createPipe();
                    this.timer = 0;
                } else {
                    this.timer += this.speed * 5;
                }

                this.pipes.forEach((pipe) => {
                    pipe.update();
                });
                this.bird.update();
                this.speed += 0.0005;
            } else {
                this.gameOverScreen.update();
            }
        } else {
            this.bird.update();
            this.startScreen.update();
        }
        this.bg.update();
        this.base.update();

        this.draw();
        window.webkitRequestAnimationFrame(this.update.bind(this));
    }
    draw() {
        this.bg.draw();
        this.base.draw();
        if (this.gameStart) {
            if (!this.gameOver) {
                this.pipes.forEach((pipe) => {
                    pipe.draw();
                });
                this.bird.draw();
            } else {
                this.gameOverScreen.draw();
            }
            this.#handleDrawScore();
        } else {
            this.bird.draw();
            this.startScreen.draw();
        }
    }
}

class GameOver {
    constructor(game) {
        this.game = game;
        this.img = new Image();
        this.img.src = "assets/sprites/gameover.png";
        this.width = 192;
        this.height = 42;
        this.x = this.game.canvasWidth / 2 - this.width / 2;
        this.y = this.game.canvasHeight / 2 - this.height / 2;
    }

    draw() {
        this.game.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        if (
            this.game.input.keys.indexOf("Enter") !== -1 ||
            this.game.input.keys.indexOf("Click") !== -1 ||
            this.game.input.keys.indexOf("Touch") !== -1
        ) {
            if (this.game.gameOver) {
                this.game.audioSwoosh.play();
                this.game.gameOver = false;
                this.game.gameScore = 0;
            }
        }
    }

    onGameOver() {
        this.game.gameOver = true;
        this.game.pipes = [];
        this.game.timer = 0;
        this.game.bird.timer = 0;
        this.game.speed = this.game.deltaTime * 0.3;
        this.game.bird.y = this.game.canvasHeight / 2;
    }
}

class StartScreen {
    constructor(game) {
        this.game = game;
        this.width = 184;
        this.height = 267;
        this.x = this.game.canvasWidth / 2 - this.width / 2;
        this.y = this.game.canvasHeight / 2 - this.height / 2;
        this.img = new Image();
        this.img.src = "assets/sprites/message.png";
    }

    draw() {
        this.game.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        if (
            (this.game.input.keys.indexOf(" ") !== -1 ||
                this.game.input.keys.indexOf("ArrowUp") !== -1 ||
                this.game.input.keys.indexOf("w") !== -1 ||
                this.game.input.keys.indexOf("Click") !== -1 ||
                this.game.input.keys.indexOf("Touch") !== -1) &&
            !this.game.gameStart
        ) {
            this.game.audioSwoosh.play();
            this.game.gameStart = true;
        }
    }
}


window.addEventListener("load", () => {
    const g = new Game();
});

