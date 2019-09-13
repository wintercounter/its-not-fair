import * as PIXI from 'pixi.js'

export default class Main {
    private app = new PIXI.Application({
        width: 960,
        height: 960,
        antialias: true,
        transparent: false,
        resolution: 1
    })

    private players

    private map

    private getPlayers

    private getMap

    public constructor({ getMap, getPlayers }) {
        this.getPlayers = getPlayers
        this.getMap = getMap

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
        this.app.stage.addChild(this.map.container)
        this.players.forEach(({ container }) => this.app.stage.addChild(container))
        document.body.appendChild(this.app.view)
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
