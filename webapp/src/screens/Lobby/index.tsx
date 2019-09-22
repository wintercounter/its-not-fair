import React, { useEffect, useContext, useState } from 'react'
import { Redirect } from 'react-router'
import { ClientContext } from '@/layouts/Client'

const Lobby = () => {
    const Client = useContext(ClientContext)
    const [{ players = {}, status }, setState] = useState({})

    useEffect(() => {
        const options = { name: '' }
        while (!(options.name = window.prompt('Give us your name'))) {} // eslint-disable-line

        Client.joinLobby(options).then(room => {
            room.onStateChange(state => {
                console.log('chnagestate', state)
                setState({ ...state })
            })
        })
    }, [])

    if (status === 'in_game') {
        return <Redirect to="/game" />
    }

    return (
        <>
            <h1>Lobby</h1>
            <ul>
                {Object.entries(players).map(([id, { name }]) => (
                    <li key={id}>
                        {name}({id})
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Lobby
