import fetch from 'isomorphic-fetch'
import {
    FETCH_STEP_REQUEST,
    FETCH_STEP_SUCCESS,
    FETCH_STEP_FAILURE,
    UPDATE_STEP_PARAMS,
    UPDATE_STEP_PLOT,
    TOGGLE_OPTIMIZE,
    SET_AVAILABLE_ITERATIONS
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

export const toggleOptimize = (optimizeActive = false) => ({type:TOGGLE_OPTIMIZE, optimizeActive});

export const setAvailableIterations = (availableIterations = 1) =>
    ({type:SET_AVAILABLE_ITERATIONS, availableIterations});