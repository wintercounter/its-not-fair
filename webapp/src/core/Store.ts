import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import { rootReducer, rootSaga } from '@/entities'

type TConfigureStore = (preloadedState, history) => Store

const configureStore: TConfigureStore = (preloadedState, history) => {
    const historyMiddleware = routerMiddleware(history)
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer(history),
        preloadedState,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware, sagaMiddleware, historyMiddleware)
        )
    )
    sagaMiddleware.run(rootSaga)
    return store
}

export default configureStore
