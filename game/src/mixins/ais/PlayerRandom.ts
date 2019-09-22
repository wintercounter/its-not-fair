import AI from '@/mixins/ais'
import { UP, RIGHT, DOWN, LEFT, MirrorOf } from '@/../../../../$hared/constants/Directions'
import { randomItem } from '@/utils/array'
import Player from '@/players'

export default class PlayerRandom extends AI {
    public beforeDraw() {
        const directions = [UP, RIGHT, DOWN, LEFT].filter(direction => {
            // Filter out where player can't go
            if (!this.player.canGo(direction)) {
                return false
            }

            // If stopped let's remove the same direction
            if (this.player.status === Player.STOPPED && direction === this.player.direction) {
                return false
            }

            // Let's not turn back
            if (direction === MirrorOf[this.player.direction]) {
                return false
            }

            return true
        })
        if (directions.length === 0) {
            directions[0] = MirrorOf[this.player.direction]
        }

        // Handle dead end
        this.player.nextDirection = randomItem(directions)
        return true
    }
}
