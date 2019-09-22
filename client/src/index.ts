import * as Colyseus from 'colyseusjs'

export default class Client extends Colyseus.Client {
    public lobby

    public game

    public constructor() {
        super('ws://localhost:2567')
    }

    public joinLobby(options) {
        return this.joinOrCreate('my_room', options).then(lobby => {
            this.lobby = lobby
            console.log(lobby.sessionId, 'joined lobby', lobby)

            lobby.onError(() => {
                console.log(this.id, `couldn't join`, lobby.name)
            })

            lobby.onLeave(() => {
                console.log(this.id, 'left', lobby.name)
            })

            return lobby
        })
    }

    public createGame(options) {
        return this.joinOrCreate('game', options).then(game => {
            this.game = game
            console.log(game.sessionId, 'joined lobby', game.name)

            console.log(game)

            game.onError(() => {
                console.log(this.id, `couldn't join`, game.name)
            })

            game.onLeave(() => {
                console.log(this.id, 'left', game.name)
            })

            return game
        })
    }

    public joinGame() {}
}
