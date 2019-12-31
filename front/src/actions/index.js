import {fetchParams} from "./params";
import {fetchData} from "./data";

export * from './params';
export * from './data';

export const fetchInitState = () => (dispatch) =>
    fetchParams()(dispatch)
        .then(() => fetchData()(dispatch))
        .catch(err =>
            console.error('could not fetch init state:', err.message)
        );
