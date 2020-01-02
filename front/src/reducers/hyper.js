import {UPDATE_HYPER} from '../actionTypes'

export const initState = {
    reg_c: 0.1,
    learning_rate: 0.1,
    loss_type: 'ww'
};

export default function hyperReducer(state = initState, action) {
    const {type} = action;
    switch (type) {
        case UPDATE_HYPER: {
            const {updating} = action;
            return {...state, ...updating};
        }
        default: {
            return state;
        }
    }
}
