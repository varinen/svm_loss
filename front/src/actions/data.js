import fetch from 'isomorphic-fetch'
import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE
} from "../actionTypes";
import {apiGetData} from "../api";
import {thunkCreator} from "./utils";

export const fetchData = (rand = 0, additional = []) => thunkCreator({
    types: [FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE],
    promise: fetch(`${apiGetData}?rand=${rand}`)
        .then(response => response.json()),
    additional: additional
});