import {FETCH_STEP_SUCCESS, TOGGLE_OPTIMIZE, SET_AVAILABLE_ITERATIONS} from '../actionTypes'

export default function stepReducer(state = {iteration: 0, optimizeActive: false, availableIterations: 1}, action) {
    const {type} = action;
    switch (type) {
        case FETCH_STEP_SUCCESS: {
            const step = action.result;
            const iteration = state.iteration + 1;
            const availableIterations = Math.max(0, state.availableIterations - 1);
            return {...state, ...step, iteration, availableIterations, optimizeActive: false};
        }
        case TOGGLE_OPTIMIZE: {
            const {optimizeActive} = action;
            return {...state, optimizeActive};
        }
        case SET_AVAILABLE_ITERATIONS: {
            const {availableIterations} = action;
            return {...state ,availableIterations};
        }
        default: {
            return state;
        }
    }
}
