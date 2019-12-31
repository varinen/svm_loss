import {FETCH_DATA_SUCCESS} from '../actionTypes'

export default function dataReducer(state = [], action) {
    const {type} = action;
    switch (type) {
        case FETCH_DATA_SUCCESS: {
            const {result} = action;
            return result;
        }
        default: {
            return state;
        }
    }
}
