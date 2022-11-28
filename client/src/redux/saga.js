import { all, put, takeLatest } from 'redux-saga/effects'
import { logInAction } from './action'
import { SESSION_AUTH } from 'const'
import { join } from './store'

function* logInActionSaga({ name, room }) {
  sessionStorage.setItem(SESSION_AUTH, JSON.stringify({ name, room }))
  yield put(join({ name, room }))
}

export default function* rootSaga() {
  // App saga
  yield takeLatest(logInAction, logInActionSaga)

  // View saga
  yield all([])
}
