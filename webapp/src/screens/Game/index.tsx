import React, { useLayoutEffect, useRef } from 'react'

import Game from '@inf/game'
import PacMan from '@inf/game/players/PacMan'
import Monster from '@inf/game/players/Monster'
import One from '@inf/game/maps/One'
import PlayerRandom from '@inf/game/mixins/ais/PlayerRandom'

import './style.scss'

const GameScreen = () => {
    const container = useRef(null)
    useLayoutEffect(() => {
        // eslint-disable-next-line
        new Game({
            container: container.current,
            getMap() {
                return new One()
            },
            getPlayers(app, map) {
                return [
                    new PacMan({ app, map, control: true }),
                    new Monster({ app, map, mixins: [PlayerRandom] }),
                    new Monster({ app, map, mixins: [PlayerRandom] }),
                    new Monster({ app, map, mixins: [PlayerRandom] })
                ]
            }
        })
    }, [])
    return <div ref={container}>Game</div>
}

export default GameScreen
