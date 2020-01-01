import {FETCH_PLOT_SUCCESS} from '../actionTypes'

export default function plotReducer(state = '', action) {
    const {type} = action;
    switch (type) {
        case FETCH_PLOT_SUCCESS: {
            console.log('Plot action:', action);
            const {plot} = action.result;
            return plot;
        }
        default: {
            return state;
        }
    }
}
