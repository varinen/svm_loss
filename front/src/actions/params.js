import fetch from 'isomorphic-fetch'
import {
    FETCH_PARAMS_REQUEST,
    FETCH_PARAMS_SUCCESS,
    FETCH_PARAMS_FAILURE,
    UPDATE_PARAMS
} from "../actionTypes";
import {apiGetParams} from "../api";
import {thunkCreator} from "./utils";

export const updateParams = (rowIndex, colIndex, type, value) => {
    const updating = {rowIndex, colIndex, type, value};
    return {type: UPDATE_PARAMS, updating};
};

export const fetchParams = (rand = 0) => thunkCreator({
    types: [FETCH_PARAMS_REQUEST, FETCH_PARAMS_SUCCESS, FETCH_PARAMS_FAILURE],
    promise: fetch(`${apiGetParams}?rand=${rand}`)
        .then(response => response.json())
});