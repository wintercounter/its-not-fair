import { arrayOf, number, string, shape, bool } from 'prop-types'

const StoreType = {
    level: arrayOf(arrayOf(number)),
    tool: string,
    undoHistory: arrayOf(shape({ id: string, data: arrayOf(number), type: string })),
    redoHistory: arrayOf(shape({ id: string, data: arrayOf(number), type: string })),
    resetted: bool
}
export default StoreType
