import React from 'react'
import { Provider } from 'react-redux'
import AppContainer from './containers/AppContainer'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

const logger = createLogger({ predicate: (getState, action) => __DEV__  })

const configureStore = (initialState) => {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      logger,
    ),
  )
  return createStore(reducer, initialState, enhancer)
}

const store = configureStore({})

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
