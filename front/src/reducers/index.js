import { combineReducers } from 'redux';

import paramsReducer from './params';
import dataReducer from './data';
import plotReducer from './plot';

const appReducer = combineReducers({
    params: paramsReducer,
    data: dataReducer,
    plot: plotReducer
});

export default appReducer
