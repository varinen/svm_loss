import {GET_PARAMS} from "../actions/constants";

const params = (state={params:{}}, action) => {
    switch (action.type) {
        case GET_PARAMS:
            console.log('params:', action.params);
            return action.params;
        default:
            console.log('default reducer');
            return state;
    }
};

export default params;