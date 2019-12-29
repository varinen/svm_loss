import {applyMiddleware} from 'redux'

import thunkMiddleware from 'redux-thunk'

export default function createMiddleware() {
    return applyMiddleware(thunkMiddleware);
}
