import React, { useLayoutEffect, useRef, useContext } from 'react'

import Game from '@inf/game'
import PacMan from '@inf/game/players/PacMan'
import Monster from '@inf/game/players/Monster'
import One from '@inf/game/maps/One'
import PlayerRandom from '@inf/game/mixins/ais/PlayerRandom'

import { ClientContext } from '@/layouts/Client'
import './style.scss'

const GameScreen = () => {
    const container = useRef(null)
    const Client = useContext(ClientContext)
    useLayoutEffect(() => {
        // eslint-disable-next-line
        new Game({
            container: container.current,
            client: Client,
            getMap() {
                return new One()
            },
            getPlayers(app, map, game) {
                return Object.entries(Client.room.state.players).map(([id, player]) => {
                    console.log('id', id, Client)
                    return new PacMan({ game, app, map, controls: id === Client.room.sessionId })
                })
            }
        })
    }, [])
    return <div ref={container}>Game</div>
}

export default GameScreen
