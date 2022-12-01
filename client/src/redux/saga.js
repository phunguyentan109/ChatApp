import { all, put, takeLatest, call } from 'redux-saga/effects'
import { logInAction } from './action'
import { SESSION_AUTH } from 'const'
import { join } from './store'
import chatSaga from 'views/Chat/slice/saga'

function fetchApi(method, url, body) {
  return Promise.resolve(
    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((rs) => rs.json())
  )
}

function* logInActionSaga({ payload }) {
  try {
    let rs = yield call(
      fetchApi,
      'POST',
      'http://localhost:8080/login',
      payload
    )

    sessionStorage.setItem(SESSION_AUTH, JSON.stringify(rs))

    yield put(join(rs))
  } catch (e) {
    console.log('login err', e)
    sessionStorage.removeItem(SESSION_AUTH)
    yield put(join())
  }
}

export default function* rootSaga() {
  // App saga
  yield takeLatest(logInAction, logInActionSaga)

  // View saga
  yield all([chatSaga()])
}
