import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { hot } from 'react-hot-loader'

import { Main, Client } from '@/layouts'
import { Home, Game, Lobby } from '@/screens'

const WithLayout = ({ layout: Layout, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={matchProps => (
            <Layout>
                <Component {...matchProps} />
            </Layout>
        )}
    />
)

const WithHotLayout = hot(module)(WithLayout)

const Router: FC<{ history: History }> = ({ history }) => (
    <ConnectedRouter history={history}>
        <Switch>
            <WithHotLayout layout={Main} path="/" exact component={Home} />
            <WithHotLayout layout={Client} path="/game" exact component={Game} />
            <WithHotLayout layout={Client} path="/lobby" exact component={Lobby} />
        </Switch>
    </ConnectedRouter>
)

export default Router
