class Help {
    constructor(ctx) {

        this.ctx = ctx;
        this.velY = 0.1;
        this.gravity = 0.01;
        this.width = 50;
        this.height = this.width;
        this.posX = this.randomX(this.gameWidth - 150);
        this.posY = 0;
        this.intervalId = 0;

        this.init()
    }

    init() {

        this.imageInstance = new Image()
        const randomNumber = Math.random() * 100

        if (randomNumber > 0 && randomNumber <= 25) {
            this.imageInstance.src = `img/laura.png`
        }
        else if (randomNumber > 25 && randomNumber <= 50) {
            this.imageInstance.src = `img/Teo.png`
        }
        else if (randomNumber > 50 && randomNumber <= 75) {
            this.imageInstance.src = `img/sara.png`
        }
        else {
            this.imageInstance.src = `img/guille.png`
        }
    }

    randomX() {
        return Math.floor(Math.random() * (this.ctx.canvas.width - this.width));
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