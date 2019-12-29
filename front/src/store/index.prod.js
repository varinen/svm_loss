import { createStore } from 'redux'

import appReducer from '../reducers'
import createMiddleware from './middleware'

export default function configureStore (initialState) {
  const middleware = createMiddleware();
  return createStore(appReducer, initialState, middleware)
}
