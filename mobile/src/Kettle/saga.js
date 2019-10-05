export function* connectSaga() {
	yield takeEvery(CONNECT, onConnectSaga);
}

export function* scanSaga() {
	yield takeEvery(SCAN, onScanSaga);
}

export function* kettleSaga() {
	yield all([ fork(scanSaga), fork(connectSaga) ]);
}
