import { combineReducers } from 'redux';

import paramsReducer from './params';
import dataReducer from './data';

const appReducer = combineReducers({
    params: paramsReducer,
    data: dataReducer
});

export default appReducer
