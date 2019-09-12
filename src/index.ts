import './style.scss'
import Main from '@/Main'
import PacMan from '@/players/PacMan'
import Monster from '@/players/Monster'
import One from '@/Maps/One'

// eslint-disable-next-line
new Main({
    map: new One(),
    // @ts-ignore
    players: [new Monster()]
})
