import './style.scss'
import Main from '@/Main'
import PacMan from '@/players/PacMan'
import Monster from '@/players/Monster'
import One from '@/Maps/One'

const map = new One()
const players = [
    new PacMan({
        map
    })
]

// eslint-disable-next-line
new Main({
    map,
    // @ts-ignore
    players
})
