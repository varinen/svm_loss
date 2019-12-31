import {fetchInitState} from './actions'

export default function initStore(store) {
    const state = store.getState();
    if (!state.params || !state.params.weights || state.params.weights.length <= 0) {
        return store.dispatch(fetchInitState())
    }
}
