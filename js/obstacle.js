class Obstacle {
    constructor(ctx) {

        this.ctx = ctx;
        this.velY = 0.2;
        this.gravity = 0.02;
        this.width = 50;
        this.height = this.width;
        this.posX = this.randomX(this.gameWidth);
        this.posY = 0;

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        const randomNumber = Math.random() * 100

        if (randomNumber > 50) {
            this.imageInstance.src = `img/reloj cuco.jpg`
        }
        else {
            this.imageInstance.src = `img/calendario.jpg`
        }
    }

    randomX() {
        return Math.floor(Math.random() * (this.ctx.canvas.width - this.width - 150));
    }

    draw() {
        this.ctx.drawImage(
            this.imageInstance,
            this.posX,
            this.posY,
            this.width,
            this.height,
        )
        this.fall();
    }

    fall() {
        this.posY += this.velY;
        this.velY += this.gravity;
    }
}
