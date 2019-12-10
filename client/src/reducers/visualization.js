import {GET_PLOT} from "../actions/constants";

const visualization = (state = [], action) => {
    switch (action.type) {
        case GET_PLOT:
            const {plot} = action;
            return {...state, plot};
        default:
            return state;
    }
};

export default visualization;