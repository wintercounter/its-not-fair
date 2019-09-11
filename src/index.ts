import './style.scss'
import Main from '@/Main'
import PacMan from '@/players/PacMan'
import One from '@/Maps/One'

// eslint-disable-next-line
new Main({
    map: new One(),
    // @ts-ignore
    players: [new PacMan()]
})
