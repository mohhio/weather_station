import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(){

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = composeEnhancers(applyMiddleware(sagaMiddleware))

    return createStore(
        rootReducer,  
        middleware);
}

