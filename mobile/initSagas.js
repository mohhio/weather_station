import * as sagas from './rootSaga';

export default function initSagas(sagaMiddleware){
    Object.keys(sagas).map(key => sagas[key]).forEach(sagaMiddleware.run);
}
