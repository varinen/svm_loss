import {createStore, compose} from 'redux';

import appReducer from '../reducers';
import createMiddleware from './middleware';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
    const enhancer = compose(
        createMiddleware(),
        DevTools.instrument()
    );

    const store = createStore(appReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers/index', () =>
            store.replaceReducer(require('../reducers/index').default)
        )
    }

    return store;
}
