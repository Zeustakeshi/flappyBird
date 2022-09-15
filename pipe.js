class Pipe {
    constructor(game) {
        this.game = game;
        this.img = new Image();
        this.img.src = "assets/sprites/pipe-green.png";
        this.space = 140;
        this.width = 52;
        this.maxHeight = 250;
        this.x = Math.floor(this.game.canvasWidth + this.width);

        this.botHeight = Math.floor(Math.random() * this.maxHeight + 1);
        this.topHeight = this.game.gameSpace - (this.botHeight + this.space);

        this.botY = this.game.gameSpace - this.botHeight;
        this.topY = 0;
        this.markedForDeletion = false;

        this.isSucces = false;
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.translate(
            this.x + this.width / 2,
            this.topY + this.topHeight / 2
        );
        this.game.ctx.rotate(Math.PI);
        this.game.ctx.translate(
            -(this.x + this.width / 2),
            -(this.topY + this.topHeight / 2)
        );
        this.game.ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.topHeight,
            this.x,
            this.topY,
            this.width,
            this.topHeight
        );
        this.game.ctx.restore();
        this.game.ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.botHeight,
            this.x,
            this.botY,
            this.width,
            this.botHeight
        );
    }

    update() {
        this.x -= this.game.speed;

        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }

        if (
            this.x <= this.game.bird.x + this.game.bird.width / 2 &&
            this.x + this.width > this.game.bird.x + this.game.bird.width / 2 &&
            !this.isSucces
        ) {
            if (
                this.game.bird.y <= this.topY + this.topHeight ||
                this.game.bird.y + this.game.bird.height >= this.botY
            ) {
                this.game.gameOverScreen.onGameOver();
                this.game.audioDie.play();
                return;
            }
            this.isSucces = true;
            this.game.audioPoint.play();
            this.game.gameScore++;
        }
    }
}
