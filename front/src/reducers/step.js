import {FETCH_STEP_SUCCESS} from '../actionTypes'

export default function stepReducer(state = {iteration: 0}, action) {
    const {type} = action;
    switch (type) {
        case FETCH_STEP_SUCCESS: {
            const step = action.result;
            const iteration = state.iteration + 1;
            return {...step, iteration};
        }
        default: {
            return state;
        }
    }
}
