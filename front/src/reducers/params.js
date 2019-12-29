import {FETCH_PARAMS_SUCCESS} from '../actionTypes'

export default function paramsReducer(state = {weights: [], biases: []}, action) {
    const {type} = action;

    if (type === FETCH_PARAMS_SUCCESS) {
        const {result: {weights, biases}} = action;
        return {...state, weights, biases};
    }

    return state
}
