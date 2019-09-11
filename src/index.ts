import './style.scss'
import Main from '@/Main'
import PacMan from '@/players/PacMan'
import One from '@/Maps/One'

new Main({
    map: new One(),
    players: [new PacMan()]
})
