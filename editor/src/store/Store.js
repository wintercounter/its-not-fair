import React, { useReducer } from 'react'
import { node, shape } from 'prop-types'
import defaultState from './shape'
import StoreType from './types'
import StoreContext from './context'
import reducer from './reducer'

const Store = function({ initialState, children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <StoreContext.Provider value={{ ...state, dispatch }}>{children}</StoreContext.Provider>
}
Store.propTypes = {
    initialState: shape(StoreType),
    children: node.isRequired
}
Store.defaultProps = {
    initialState: window.localStorage.getItem('its-not-fair-map-editor')
        ? JSON.parse(window.localStorage.getItem('its-not-fair-map-editor'))
        : defaultState
}

export default Store
