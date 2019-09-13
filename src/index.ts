import './style.scss'
import Main from '@/Main'
import PacMan from '@/players/PacMan'
import Monster from '@/players/Monster'
import One from '@/Maps/One'

new Main({
    getMap(app) {
        return new One({ app })
    },
    getPlayers(app, map) {
        return [new Monster({ app, map })]
    }
})
