/* eslint-disable max-statements */
/* eslint-disable complexity */
import * as Action from './actions'
import { saveJson } from '@/utils/'
import defaultState from './shape'

const UNDO_HISTORY_LIMIT = 350

const toUndoHistory = (state, { row, col, cellType }) => {
    const { undoHistory } = state
    const undoItem = { row, col, cellType }
    const nextUndoHistory = undoHistory.concat()
    if (nextUndoHistory.length > UNDO_HISTORY_LIMIT) {
        nextUndoHistory.pop()
    }
    nextUndoHistory.unshift(undoItem)
    return nextUndoHistory
}

const toRedoHistory = (state, { row, col, cellType }) => {
    const { redoHistory } = state
    const redoItem = { row, col, cellType }
    const nextRedoHistory = redoHistory.concat()
    nextRedoHistory.unshift(redoItem)
    return nextRedoHistory
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case Action.LEVEL_LOAD: {
            return { ...state, level: payload, resetted: false }
        }

        case Action.TOOL_SELECT:
            return { ...state, tool: payload }

        case Action.TOOL_PAINT_CELL: {
            const { level } = state
            const { row, col, cellType } = payload

            const nextLevel = level.map(arr => arr.slice())
            nextLevel[row][col] = cellType

            return {
                ...state,
                level: nextLevel,
                undoHistory: toUndoHistory(state, { row, col, cellType: level[row][col] }),
                redoHistory: []
            }
        }

        case Action.TOOL_CLEAR_CELL: {
            const { level } = state
            const { row, col } = payload

            const nextLevel = level.map(arr => arr.slice())
            nextLevel[row][col] = 0

            return {
                ...state,
                level: nextLevel,
                undoHistory: toUndoHistory(state, { row, col, cellType: 0 }),
                redoHistory: []
            }
        }

        case Action.UNDO: {
            const { undoHistory, level } = state
            if (!undoHistory.length) {
                return state
            }
            const nextLevel = level.map(arr => arr.slice())
            const nextUndoHistory = undoHistory.concat()
            const cell = nextUndoHistory.shift()

            nextLevel[cell.row][cell.col] = cell.cellType

            return {
                ...state,
                level: nextLevel,
                undoHistory: nextUndoHistory,
                redoHistory: toRedoHistory(state, {
                    row: cell.row,
                    col: cell.col,
                    cellType: level[cell.row][cell.col]
                })
            }
        }

        case Action.REDO: {
            const { redoHistory, level } = state
            if (!redoHistory.length) {
                return state
            }
            const nextLevel = level.map(arr => arr.slice())
            const nextRedoHistory = redoHistory.concat()
            const cell = nextRedoHistory.shift()

            nextLevel[cell.row][cell.col] = cell.cellType

            return {
                ...state,
                level: nextLevel,
                redoHistory: nextRedoHistory,
                undoHistory: toUndoHistory(state, {
                    row: cell.row,
                    col: cell.col,
                    cellType: level[cell.row][cell.col]
                })
            }
        }

        case Action.RESET_EDITOR:
            window.localStorage.removeItem('its-not-fair-map-editor')
            window.location.reload()
            return defaultState

        case Action.LEVEL_SAVE:
            saveJson(state.level)
            return state

        case Action.SAVE_LOCAL: {
            const localData = JSON.stringify(state)
            window.localStorage.setItem('its-not-fair-map-editor', localData)
            return state
        }
        default:
            return state
    }
}

export default reducer
