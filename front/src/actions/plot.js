import fetch from 'isomorphic-fetch'
import {
    FETCH_PLOT_REQUEST,
    FETCH_PLOT_SUCCESS,
    FETCH_PLOT_FAILURE
} from "../actionTypes";
import {apiFetchPlot} from "../api";
import {thunkCreator} from "./utils";

export const fetchPlot = (params = {weights:[], biases:[]}, data=[]) => thunkCreator({
    types: [FETCH_PLOT_REQUEST, FETCH_PLOT_SUCCESS, FETCH_PLOT_FAILURE],
    promise: fetch(`${apiFetchPlot}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                params, data
            })
        })
        .then(response => response.json())
});