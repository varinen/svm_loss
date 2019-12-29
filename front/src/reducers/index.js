import { combineReducers } from 'redux'

import paramsReducer from './params'

const appReducer = combineReducers({
    params: paramsReducer,
});

export default appReducer
