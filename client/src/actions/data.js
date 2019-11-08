import {GET_DATA} from './constants';
import {urls} from './api';

export const getData = (rand = 0) => {
    let url = new URL(urls.get_data);
    if (rand === 1) {
        url.search += 'rand=1';
    }
    return dispatch => {
        return fetch(url)
            .then(resp => resp.json())
            .then(json => {
                return dispatch({type: GET_DATA, data: json})
            });
    }
};