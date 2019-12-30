import {FETCH_PARAMS_SUCCESS, UPDATE_PARAMS} from '../actionTypes'

export default function paramsReducer(state = {weights: [], biases: []}, action) {
    const {type} = action;
    switch (type) {
        case FETCH_PARAMS_SUCCESS: {
            const {result: {weights, biases}} = action;
            return {...state, weights, biases};
        }
        case UPDATE_PARAMS: {
            const {updating: {rowIndex, colIndex, type, value}} = action;
            let stateNew = {...state};
            if (type === 'biases') {
                stateNew.biases[rowIndex] = value;
            } else {
                stateNew.weights[rowIndex][colIndex] = value;
            }
            return stateNew
        }
        default: {
            return state;
        }
    }
}
