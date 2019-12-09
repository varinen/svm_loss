import {GET_PARAMS, MODIFY_PARAM} from "../actions/constants";

const params = (state = {}, action) => {
    switch (action.type) {
        case GET_PARAMS:
            const {params} = action;
            return {...state, params};
        case MODIFY_PARAM:
            const {modified} = action;
            const stateModified = {...state};
            if (modified.paramType === 'bias') {
                stateModified.params.biases[modified.paramIndex]
                    = parseFloat(modified.paramValue);
            } else {
                stateModified.params.weights[modified.paramIndex]
                    = parseFloat(modified.paramValue);
            }
            return {...state, ...stateModified};

        default:
            return state;
    }
};

export default params;