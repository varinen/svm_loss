import {fetchParams} from "./params";
import {fetchData} from "./data";
import {fetchPlot} from "./plot";

export * from './params';
export * from './data';
export * from './plot';
export * from './hyper';
export * from './step';

export const fetchInitState = (store) => (dispatch) =>
    fetchParams()(dispatch)
        .then(() => fetchData()(dispatch))
        .then(() => {
                const state = store.getState();
                return fetchPlot(state.params, state.data)(dispatch)
        })
        .catch(err =>
            console.error('could not fetch init state:', err.message)
        );
