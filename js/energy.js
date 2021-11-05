class Energy {
    constructor(ctx, energy) {
        this.ctx = ctx;
        this.width = 200;
        this.height = 400;
        this.energy = energy;
        this.posX = 40;
        this.posY = 70;
    }

    draw() {
        this.ctx.fillStyle = "green",
            this.ctx.strokeStyle = "black",
            this.ctx.fillRect(1280, 60, 40, this.height),
            this.posX,
            this.posY,
            this.width,
            this.height >= 0 && this.height <= 400

        this.encreaseEnergy()
        this.decreaseEnergy()
    }

    encreaseEnergy() {
        if (game.isCollisionHelp()) {
            if (this.height < 400) {
                this.height += 20
            }
        }
    }
    decreaseEnergy() {
        if (game.isCollisionObstacle()) {
            if (this.height > 0) {
                this.height -= 50
            } else {
                game.gameOver()
            }
        }
    }
}




