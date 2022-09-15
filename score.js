class Score {
    constructor(game) {
        this.game = game;
        this.imgs = [];
        for (let i = 0; i <= 9; ++i) {
            const img = new Image();
            img.src = `assets/sprites/${i}.png`;
            this.imgs.push(img);
        }
        this.width = 24 / 2;
        this.height = 36 / 2;
    }

    draw(score, x, y) {
        this.game.ctx.drawImage(
            this.imgs[score],
            x,
            y,
            this.width,
            this.height
        );
    }
}
