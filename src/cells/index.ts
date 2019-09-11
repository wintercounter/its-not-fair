import SimpleSpace from './SimpleSpace'
import SimpleWall from './SimpleWall'
import SpawnPoint from './SpawnPoint'

const cellMap = {
    0: SimpleSpace,
    1: SimpleWall,
    2: SpawnPoint
}

export default cellMap
