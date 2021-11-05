const game = {
    title: 'this.IronHacker',
    author: 'Marta',
    license: undefined,
    version: 'la mía',
    description: 'Mi primer proyectito',
    canvasDOM: undefined,
    ctx: undefined,
    canvasSize: { width: undefined, height: undefined },
    framesCounter: 0,
    frames: 60,
    energy: 0,
    energyCounter: 0,
    intervalId: undefined,
    background: undefined,
    player: undefined,
    scoreBoard: undefined,
    obstacle: [],
    help: [],

    keys: {
        player: {
            UP: 38,
            DOWN: 40,
            RIGHT: 39,
            LEFT: 37,
            SPACE: 32,
        }
    },

    init() {
        this.setContext()
        this.setDimensions()
        this.createAll()
        this.setListeners()
        this.start()
    },
    setContext() {
        this.canvasDOM = document.querySelector("#myCanvas")
        this.ctx = this.canvasDOM.getContext("2d")
    },
    setDimensions() {
        this.canvasSize.width = window.innerWidth;
        this.canvasSize.height = window.innerHeight;

        this.canvasDOM.setAttribute("width", this.canvasSize.width);
        this.canvasDOM.setAttribute("height", this.canvasSize.height);
    },
    createAll() {
        this.createBackground()
        this.createPlayer()
        this.createHelp()
        this.createObstacle()
        this.createCounter()
    },
    createBackground() {
        this.background = new Background(this.ctx, 0, 50, this.canvasSize.width, this.canvasSize.height, 0.5, "fondo2.jpg")
    },
    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize.width / 2, this.canvasSize.height - 100, 65, 80, 5, 5, "chica_escalando_sin_pared.png")
    },
    createHelp() {
        this.help.push(new Help(this.ctx))
    },
    createObstacle() {
        this.obstacle.push(new Obstacle(this.ctx))
    },
    createCounter() {
        this.counter = new Energy(this.ctx)
    },

    setListeners() {

        document.addEventListener("keydown", (e) => {

            if (e.key === "ArrowUp") {
                this.player.movingUp = true;
            }
            if (e.key === "ArrowDown") {
                this.player.movingDown = true;
            }
            if (e.key === "ArrowLeft") {
                this.player.movingLeft = true;
            }
            if (e.key === "ArrowRight") {
                this.player.movingRight = true;
            }
        });

        document.addEventListener("keyup", (e) => {

            if (e.key === "ArrowUp") {
                this.player.movingUp = false;
            }

            if (e.key === "ArrowDown") {
                this.player.movingDown = false;
            }

            if (e.key === "ArrowLeft") {
                this.player.movingLeft = false;
            }

            if (e.key === "ArrowRight") {
                this.player.movingRight = false;
            }
        });
    },

    start() {

        this.intervalId = setInterval(() => {
            this.framesCounter += 1
            this.clearScreen()
            this.drawAll()
            this.moveAll()
            this.clearObstacle()
            this.clearHelp()
            this.counter.decreaseEnergy()
            this.counter.encreaseEnergy()

            if (this.framesCounter % 20 === 0) {
                this.createObstacle()
            }
            if (this.framesCounter % 160 === 0) {
                this.createHelp()
            }

        }, 800 / this.frames)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },
    drawAll() {
        this.drawBackground()
        this.drawPlayer()
        this.drawHelp()
        this.drawObstacle()
        this.drawEnergy()
    },
    drawBackground() {
        this.background.draw()
    },
    drawPlayer() {
        this.player.draw(this.framesCounter)
    },
    drawHelp() {
        this.help.forEach(help => help.draw())
    },
    drawObstacle() {
        this.obstacle.forEach(obstacle => obstacle.draw())
    },
    drawEnergy() {
        this.counter.draw()
    },

    clearObstacle() {
        this.obstacle = this.obstacle.filter(
            (obstacle) => !obstacle.toDelete
        )
    },
    clearHelp() {
        this.help = this.help.filter(
            (help) => !help.toDelete
        )
    },

    moveAll() {
        this.moveBackground()
        this.movePlayer()
    },
    moveBackground() {
        this.background.move()
    },
    movePlayer() {
        this.player.move()
    },
    isCollisionObstacle() {
        return this.obstacle.some(obstacle => {

            if (
                this.player.pos.x + this.player.size.width > obstacle.posX &&
                this.player.pos.x < obstacle.posX + obstacle.width &&
                this.player.pos.y > obstacle.posY - obstacle.height &&
                this.player.pos.y < obstacle.posY
            ) {
                obstacle.toDelete = true
                return true
            }
        })
    },
    isCollisionHelp() {
        return this.help.some(help => {

            if (
                this.player.pos.x + this.player.size.width > help.posX &&
                this.player.pos.x < help.posX + help.width &&
                this.player.pos.y > help.posY - help.height &&
                this.player.pos.y < help.posY
            ) {
                help.toDelete = true
                return true
            }
        })
    },

    gameOver() {
        clearInterval(this.intervalId)
    }
}
