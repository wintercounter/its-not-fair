import Mixin from '@/mixins'

export default class AI extends Mixin {
    public player

    public constructor(player) {
        super()
        this.player = player
    }
}
