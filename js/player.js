class Player {
    constructor(ctx, posX, posY, width, height, speedY, speedX, imageName) {
        this.ctx = ctx

        this.pos = {
            x: posX,
            y: posY,
            initialY: posY
        }
        this.size = {
            width: width,
            height: height
        }
        this.speed = {
            x: speedX,
            y: speedY
        }
        this.frames = 1
        this.framesIndex = 0

        this.imageInstance = undefined
        this.imageName = imageName

        this.movingLeft = this.pos.x - this.speed.x
        this.movingRight = this.pos.x + this.speed.x
        this.movingUp = false
        this.movingDown = this.pos.y + this.speed.y

        this.init()
    }
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/chica_escalando_sin_pared.png`
    }
    draw(framesCounter) {
        //ancho de un recorte this.imageInstance.width / this.frames
        this.ctx.drawImage(
            this.imageInstance,
            this.pos.x,
            this.pos.y,
            this.size.width,
            this.size.height
        )

        if (framesCounter % 10 === 0) {
            this.animate()
        }
    }

    animate() {
        if (this.framesIndex === 1) {
            this.framesIndex = 0
        }
        this.framesIndex++
    }

    jump() {
        if (this.pos.y >= this.pos.initialY) {
            this.pos.y -= 30
            this.speed.y = -15
        }
    }

    move() {

        if (this.movingUp === true) {
            this.pos.y = this.pos.y - this.speed.y
        }
        if (this.movingDown === true) {
            this.pos.y = this.pos.y + this.speed.y
        }
        if (this.movingLeft === true) {
            this.pos.x = this.pos.x - this.speed.x
        }
        if (this.movingRight === true) {
            this.pos.x = this.pos.x + this.speed.x
        }


        if (this.pos.x < 0) {
            this.pos.x = 0
        }
        if (this.pos.x >= this.ctx.canvas.width - this.size.width - 70) {
            this.pos.x = this.ctx.canvas.width - this.size.width - 70
        }
        if (this.pos.y < 0) {
            this.pos.y = 0
        }
        if (this.pos.y >= this.ctx.canvas.height - this.size.height) {
            this.pos.y = this.ctx.canvas.height - this.size.height
        }
    }
}


