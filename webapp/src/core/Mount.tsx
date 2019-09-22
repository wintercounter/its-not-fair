import '@/core/styles.global.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { Shell, Store } from '@/core'

const Mount = (el, initialState) => {
    const history = createBrowserHistory()
    const store = Store(initialState, history)

    ReactDOM.render(
        <Provider store={store}>
            <Shell history={history} />
        </Provider>,
        el
    )
}

export default Mount
