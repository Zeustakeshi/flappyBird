class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener("keydown", (e) => {
            if (
                (e.key === "ArrowUp" ||
                    e.key === "w" ||
                    e.key === " " ||
                    e.key === "Enter") &&
                this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener("keyup", (e) => {
            if (
                e.key === "ArrowUp" ||
                e.key === " " ||
                e.key === "w" ||
                e.key === "Enter"
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });

        this.game.canvas.addEventListener("mousedown", () => {
            if (this.keys.indexOf("Click") === -1) {
                this.keys.push("Click");
            }
        });
        this.game.canvas.addEventListener("mouseup", () => {
            this.keys.splice(this.keys.indexOf("Click", 1));
        });
    }
}
