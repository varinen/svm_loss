import {GET_PARAMS} from "../actions/constants";

const params = (state = {}, action) => {
    switch (action.type) {
        case GET_PARAMS:
            return action.params;
        default:
            console.log('default from reducer', state);
            return state;
    }
};

export default params;