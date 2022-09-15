class Background {
    constructor(game) {
        this.game = game;
    }

    update() {
        if (this.x <= -this.width) this.x = 0;
        else this.x -= this.game.speed;
    }
    draw() {
        this.game.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.game.ctx.drawImage(
            this.img,
            this.x + this.game.canvasWidth,
            this.y,
            this.width,
            this.height
        );
    }
}

class Base extends Background {
    constructor(game) {
        super(game);
        this.game = game;
        this.x = 0;
        this.y = this.game.canvasHeight - this.game.baseHeight;
        this.width = this.game.canvasWidth;
        this.height = this.game.baseHeight;
        this.img = new Image();
        this.img.src = "assets/sprites/base.png";
    }
}

class Bg extends Background {
    constructor(game) {
        super(game);
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = this.game.canvasWidth;
        this.height = this.game.canvasHeight;

        this.bgDay = new Image();
        this.bgDay.src = "assets/sprites/background-day.png";
        this.bgNight = new Image();
        this.bgNight.src = "assets/sprites/background-night.png";
        this.img = this.bgDay;
    }
    update() {
        super.update();
        this.x *= this.game.gameStart ? 0 : 1;
    }
}
