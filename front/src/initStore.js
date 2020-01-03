import {fetchInitState, setAvailableIterations} from './actions';
import {fetchPlot, fetchStep, toggleOptimize} from "./actions";
import {DEACTIVATE_PLOT_UPDATE} from "./actionTypes";

export default function initStore(store) {
    let state = store.getState();
    setInterval(() => {
        let state = store.getState();
        if (state.plot
            && state.plot.updateNeeded
            && state.params
            && state.params.weights
            && state.params.weights.length > 0
            && state.data && state.data.length > 0) {
            store.dispatch({type: DEACTIVATE_PLOT_UPDATE});
            store.dispatch(fetchPlot(state.params, state.data));
        }
    }, 500);

    setInterval(() => {
        let state = store.getState();
        if (state.step.optimizeActive) {
            let availIter = Math.max(0, state.step.availableIterations - 1);
            store.dispatch(setAvailableIterations, availIter);
            store.dispatch(toggleOptimize(false));
            store.dispatch(fetchStep(state.params, state.data, state.hyper, availIter));
        }
    }, 500);

    if (!state.params || !state.params.weights || state.params.weights.length <= 0) {
        return store.dispatch(fetchInitState(store));
    }
}
