import * as PIXI from 'pixi.js'

export default class Game {
    private app = new PIXI.Application({
        width: 704,
        height: 704,
        antialias: true,
        transparent: false,
        resolution: 1
    })

    private players

    private map

    private getPlayers

    private getMap

    private container

    public constructor({ getMap, getPlayers, container }) {
        this.getPlayers = getPlayers
        this.getMap = getMap
        this.container = container

        this.load()
    }

    public load() {
        this.app.loader
            //.add(SpritePacMan)
            .add('monster', 'monster.json')
            .load(this.setup)
    }

    private setup = () => {
        this.map = this.getMap(this.app)
        this.players = this.getPlayers(this.app, this.map)
        this.app.renderer.backgroundColor = 0x000000
        this.app.stage.addChild(this.map.baseLayer)
        this.app.stage.addChild(this.map.graphicsLayer)
        this.app.stage.addChild(this.map.animationLayer)
        this.players.forEach(({ container }) => this.app.stage.addChild(container))
        this.container.appendChild(this.app.view)
        this.start()
    }

    private start() {
        this.app.ticker.add(this.loop)
    }

    private loop = () => {
        this.players.forEach(player => player.draw())
        this.map.draw()
    }
}
