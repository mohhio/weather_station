import { takeEvery } from 'redux-saga/effects';

export function* onFirstTestSaga(action) {
    
}

export function* firstTestSaga() {
    yield takeEvery('FIRST_TEST_SAGA', onFirstTestSaga);
}
