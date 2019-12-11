import {combineReducers} from "redux";
import params from './params';
import data from './data';
import visualization from './visualization'

const rootReducer = combineReducers([params, data, visualization]);
export default rootReducer;