import {GET_PARAMS} from './constants';
const API_PREFIX = process.env.API_PREFIX || 'http://localhost:5000';

const urls = {
    get_params: `${API_PREFIX}/get_params`
};

export const getParams = (rand = 0) => {
    let url = new URL(urls.get_params);
    if (rand === 1) {
        url.search += 'rand=1';
    }
    return dispatch => {
        return fetch(url)
            .then(resp => resp.json())
            .then(json => {
                console.log('fetched data:', json);
                return dispatch({type: GET_PARAMS, params: json})
            });
    }
};