import {GET_PARAMS, MODIFY_PARAM} from "../actions/constants";

const params = (state = {weights: [], biases: []}, action) => {
    switch (action.type) {
        case GET_PARAMS:
            const {params} = action;
            return {...state, ...params};
        case MODIFY_PARAM:
            const {modified} = action;
            const stateModified = {...state};
            if (modified.paramType === 'bias') {
                stateModified.biases[modified.paramIndex]
                    = parseFloat(modified.paramValue);
            } else {
                stateModified.weights[modified.paramIndex[0]][modified.paramIndex[1]]
                    = parseFloat(modified.paramValue);
            }
            return {...state, ...stateModified};

        default:
            return state;
    }
};

export default params;