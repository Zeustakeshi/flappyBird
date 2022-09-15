class Bird {
    constructor(game) {
        this.game = game;
        this.img = new Image();
        this.img2 = new Image();
        this.img3 = new Image();
        this.img.src = "assets/sprites/yellowbird-midflap.png";
        this.img2.src = "assets/sprites/yellowbird-downflap.png";
        this.img3.src = "assets/sprites/yellowbird-upflap.png";
        this.frames = [this.img, this.img2, this.img3];
        this.currentFrame = 0;

        this.width = 34;
        this.height = 24;
        this.x = this.game.canvasWidth / 2 - this.width / 2;
        this.y = this.game.canvasHeight / 2 + 100;
        this.weight = 4;
        this.vy = 0;
        this.timer = 0;
        this.interVal = this.game.interVal / 10;

        this.angle = 0;
    }
    update() {
        this.y += this.game.gameStart ? this.vy + this.weight : 0;

        if (this.timer > this.interVal) {
            this.currentFrame >= 2
                ? (this.currentFrame = 0)
                : this.currentFrame++;
            this.timer = 0;
        } else {
            this.timer += this.game.speed * 5;
        }

        if (
            (this.game.input.keys.indexOf(" ") !== -1 ||
                this.game.input.keys.indexOf("ArrowUp") !== -1 ||
                this.game.input.keys.indexOf("w") !== -1 ||
                this.game.input.keys.indexOf("Click") !== -1) &&
            this.game.gameStart
        ) {
            this.vy = -10;
            this.angle = -30;
        } else if (this.game.gameStart) {
            this.vy = 0;
            this.angle = 30;
        }

        if (this.y < 0) {
            this.y = 0;
        } else if (
            this.y >
            this.game.canvasHeight - this.height - this.game.baseHeight
        ) {
            this.y =
                this.game.canvasHeight - this.height - this.game.baseHeight;
        }
    }
    draw() {
        this.game.ctx.save();
        this.game.ctx.translate(
            this.x + this.width / 2,
            this.y + this.height / 2
        );
        this.game.ctx.rotate((this.angle * Math.PI) / 180);
        this.game.ctx.translate(
            -(this.x + this.width / 2),
            -(this.y + this.height / 2)
        );
        this.game.ctx.drawImage(
            this.frames[this.currentFrame],
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.game.ctx.restore();
    }
}
