import {FETCH_PLOT_SUCCESS,
    ACTIVATE_PLOT_UPDATE,
    DEACTIVATE_PLOT_UPDATE,
    UPDATE_STEP_PLOT
} from '../actionTypes'

export default function plotReducer(state = {image:'', updateNeeded: false}, action) {
    const {type} = action;
    switch (type) {
        case FETCH_PLOT_SUCCESS: {
            const {plot} = action.result;
            return {image: plot, updateNeeded: false};
        }
        case ACTIVATE_PLOT_UPDATE: {
            return {...state, updateNeeded: true};
        }
        case DEACTIVATE_PLOT_UPDATE: {
            return {...state, updateNeeded: false};
        }
        case UPDATE_STEP_PLOT: {
            const {parentResult: {plot}} = action;
            return {image: plot, updateNeeded: false};
        }
        default: {
            return state;
        }
    }
}
