import {GET_DATA} from "../actions/constants";

const data = (state = [], action) => {
    switch (action.type) {
        case GET_DATA:
            const {data} = action;
            return [ ...data];
        default:
            return state;
    }
};

export default data;