import {CONNECT, SCAN} from './action';
import { takeEvery, put, call, take, cancelled, all, fork } from 'redux-saga/effects';

export function* onConnectSaga(action)
{
	alert('laczymy');
}

export function* connectSaga() {
	yield takeEvery(CONNECT, onConnectSaga);
	
}

export function* scanSaga() {
	//yield takeEvery(SCAN, onScanSaga);
}

export function* kettleSaga() {
	yield all([ fork(scanSaga), fork(connectSaga) ]);
}
