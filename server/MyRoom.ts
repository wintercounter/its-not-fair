import { Room, Client } from 'colyseus'
import { MapSchema, Schema, type } from '@colyseus/schema'

class Player extends Schema {
    @type('string')
    public name

    constructor({ name }) {
        super()
        this.name = name
    }
}

class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>()

    @type('string')
    status = 'in_lobby'

    createPlayer(id: string, options) {
        this.players[id] = new Player(options)
    }

    removePlayer(id: string) {
        delete this.players[id]
    }

    movePlayer(id: string, movement: any) {
        if (movement.x) {
            this.players[id].x += movement.x * 10
        } else if (movement.y) {
            this.players[id].y += movement.y * 10
        }
    }
}

export class MyRoom extends Room {
    maxClients = 2

    onCreate(options) {
        console.log('StateHandlerRoom created!', options)

        this.setState(new State())
    }

    onJoin(client: Client, options) {
        console.log('options', options)
        this.state.createPlayer(client.sessionId, options)

        if (Object.keys(this.state.players).length === this.maxClients) {
            console.log('status: in_game')
            this.state.status = 'in_game'
        }
    }

    onLeave(client) {
        this.state.removePlayer(client.sessionId)
    }

    onMessage(client, data) {
        console.log('StateHandlerRoom received message from', client.sessionId, ':', data)
        this.state.movePlayer(client.sessionId, data)
    }

    onDispose() {
        console.log('Dispose StateHandlerRoom')
    }
}
