import './style.scss'
import Main from "@/Main";
import PacMan from "@/players/PacMan";
import One from '@/Maps/One'

new Main({
    players: [new PacMan()],
    map: new One()
})