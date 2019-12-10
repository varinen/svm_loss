import {GET_PLOT} from './constants';
import {urls} from './api';

export const getPlot = (data = [], params = {}) => {
    let url = new URL(urls.get_plot);

    return dispatch => {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers(
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            ),
            body: JSON.stringify({'data': data, 'params': params}),
        })
            .then(resp => {
                if (!resp.ok) {
                    throw Error(resp.statusText);
                }
                return resp.json();
            })
            .then(json => {
                return dispatch({type: GET_PLOT, plot: json.plot})
            }).catch((err) => {
                console.log(err);
                return dispatch({type: GET_PLOT, plot: ''})
            });
    }
};