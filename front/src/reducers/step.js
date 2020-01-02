import {FETCH_STEP_SUCCESS} from '../actionTypes'

export default function stepReducer(state = {}, action) {
    const {type} = action;
    switch (type) {
        case FETCH_STEP_SUCCESS: {
            const step = action.result;
            return {step};
        }
        default: {
            return state;
        }
    }
}
