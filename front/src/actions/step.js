import fetch from 'isomorphic-fetch'
import {
    FETCH_STEP_REQUEST,
    FETCH_STEP_SUCCESS,
    FETCH_STEP_FAILURE,
    UPDATE_STEP_PARAMS,
    UPDATE_STEP_PLOT
} from "../actionTypes";
import {apiFetchStep} from "../api";
import {thunkCreator} from "./utils";

export const fetchStep = (params = {weights:[], biases:[]}, data=[], hyper={}) => thunkCreator({
    types: [FETCH_STEP_REQUEST, FETCH_STEP_SUCCESS, FETCH_STEP_FAILURE],
    promise: fetch(`${apiFetchStep}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                params, data, hyper
            })
        })
        .then(response => response.json()),
    additional:[{type: UPDATE_STEP_PARAMS}, {type: UPDATE_STEP_PLOT}]
});
