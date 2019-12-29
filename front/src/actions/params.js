import fetch from 'isomorphic-fetch'
import {FETCH_PARAMS_REQUEST, FETCH_PARAMS_SUCCESS, FETCH_PARAMS_FAILURE} from "../actionTypes";
import {apiGetParams} from "../api";
import {thunkCreator} from "./utils";


export const fetchParams = (rand = 0) => thunkCreator({
    types: [FETCH_PARAMS_REQUEST, FETCH_PARAMS_SUCCESS, FETCH_PARAMS_FAILURE],
    promise: fetch(`${apiGetParams}?rand=${rand}`)
        .then(response => response.json())
});

export const fetchInitState = () => (dispatch) =>
    fetchParams()(dispatch)
        .catch(err =>
            console.error('could not fetch init state:', err.message)
        );