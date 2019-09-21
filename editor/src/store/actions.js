export const LEVEL_LOAD = 'LEVEL:LOAD'
export const LEVEL_SAVE = 'LEVEL:SAVE'
export const SAVE_LOCAL = 'SAVE:LOCAL'
export const TOOL_SELECT = 'TOOL:SELECT'
export const TOOL_PAINT_CELL = 'TOOL:PAINT_CELL'
export const TOOL_CLEAR_CELL = 'TOOL:CLEAR_CELL'
export const UNDO = 'UNDO'
export const REDO = 'REDO'
export const RESET_EDITOR = 'RESET_EDITOR'

export const loadLevel = data => ({
    type: LEVEL_LOAD,
    payload: data
})

export const saveLevel = () => ({
    type: LEVEL_SAVE
})

export const selectTool = data => ({
    type: TOOL_SELECT,
    payload: data
})

export const paintCell = data => ({
    type: TOOL_PAINT_CELL,
    payload: data
})

export const clearCell = data => ({
    type: TOOL_CLEAR_CELL,
    payload: data
})

export const saveLocal = () => ({
    type: SAVE_LOCAL
})

export const undo = () => ({
    type: UNDO
})

export const redo = () => ({
    type: REDO
})

export const resetEditor = () => ({
    type: RESET_EDITOR
})
