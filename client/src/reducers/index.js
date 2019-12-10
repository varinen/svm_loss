import {combineReducers} from "redux";
import params from './params';
import data from './data';
import visualization from './visualization'

export default combineReducers({params, data, visualization});