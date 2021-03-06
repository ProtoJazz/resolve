import React from 'react'
import { render } from 'react-dom'
import {
  AppContainer,
  createStore,
  deserializeInitialState
} from 'resolve-redux'
import createHistory from 'history/createBrowserHistory'

import routes from '$resolve.routes'
import rootPath from '$resolve.rootPath'
import staticPath from '$resolve.staticPath'
import aggregateActions from '$resolve.aggregateActions'
import viewModels from '$resolve.viewModels'
import readModels from '$resolve.readModels'
import aggregates from '$resolve.aggregates'
import subscribeAdapter from '$resolve.subscribeAdapter'
import redux from '$resolve.redux'

var initialState = deserializeInitialState(viewModels, window.__INITIAL_STATE__)

var origin = window.location.origin

var history = createHistory({
  basename: rootPath
})

var isClient = true

var store = createStore({
  redux,
  viewModels,
  readModels,
  aggregates,
  subscribeAdapter,
  initialState,
  history,
  origin,
  rootPath,
  isClient
})

render(
  <AppContainer
    origin={origin}
    rootPath={rootPath}
    staticPath={staticPath}
    aggregateActions={aggregateActions}
    store={store}
    history={history}
    routes={routes}
  />,
  document.getElementsByClassName('app-container')[0]
)
