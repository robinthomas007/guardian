import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import createReducer from './reducers';

const configureStore = (initialState = {}) => {
    const rootReducer = createReducer();

    const middlewares = [thunk];

    if (!['production', 'test'].includes(process.env.NODE_ENV)) {
        middlewares.push(createLogger({ collapsed: true }));
    }

    const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

    return store;
};

export default configureStore;
