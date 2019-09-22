import * as Colyseus from 'colyseusjs'

export default class Client extends Colyseus.Client {
    public room

    public game

    public constructor() {
        super('ws://localhost:2567')
    }

    public joinLobby(options) {
        return this.joinOrCreate('my_room', options).then(room => {
            this.room = room
            console.log(room.sessionId, 'joined lobby', room)

            room.onError(() => {
                console.log(this.id, `couldn't join`, room.name)
            })

            room.onLeave(() => {
                console.log(this.id, 'left', room.name)
            })

            return room
        })
    }
}
