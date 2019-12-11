import {GET_PLOT} from "../actions/constants";

const visualization = (state = [], action) => {
    switch (action.type) {
        case GET_PLOT:
            const {plot} = action;
            if (!!plot) {
                return {...state, plot};
            }
            return state;

        default:
            return state;
    }
};

export default visualization;