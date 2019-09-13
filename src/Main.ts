import * as PIXI from 'pixi.js'

export default class Main {
    private app = new PIXI.Application({
        width: 900,
        height: 900,
        antialias: true,
        transparent: false,
        resolution: 1
    })

    private players

    private map

    public constructor({ players = [], map }) {
        this.players = players
        this.map = map

        players.forEach(player => {
            // @ts-ignore
            player.app = this.app // eslint-disable-line
        })

        this.load()
    }

    private load() {
        this.app.loader
            //.add(SpritePacMan)
            .add('monster', 'monster.json')
            .load(this.setup)
    }

    private setup = () => {
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
