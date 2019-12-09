import {GET_PARAMS, MODIFY_PARAM} from './constants';
import {urls} from './api';

export const getParams = (rand = 0) => {
    let url = new URL(urls.get_params);
    if (rand === 1) {
        url.search += 'rand=1';
    }
    return dispatch => {
        return fetch(url)
            .then(resp => resp.json())
            .then(json => {
                return dispatch({type: GET_PARAMS, params: json})
            });
    }
};

export const modifyParam = (paramType, paramIndex, paramValue) => {
    return {
        type: MODIFY_PARAM,
        modified: {paramType, paramIndex, paramValue}
    };
};