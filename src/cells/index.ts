import SimpleSpace from './SimpleSpace'
import SimpleWall from './SimpleWall'
import SpawnPointToLeft from './SpawnPointToLeft'
import SpawnPointToRight from './SpawnPointToRight'

const cellMap = {
    0: SimpleSpace,
    1: SimpleWall,
    2: SpawnPointToLeft,
    3: SpawnPointToRight
}

export default cellMap
