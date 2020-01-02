import { combineReducers } from 'redux';

import paramsReducer from './params';
import dataReducer from './data';
import plotReducer from './plot';
import hyperReducer from "./hyper";
import stepReducer from "./step";

const appReducer = combineReducers({
    params: paramsReducer,
    data: dataReducer,
    plot: plotReducer,
    hyper: hyperReducer,
    step: stepReducer
});

export default appReducer
