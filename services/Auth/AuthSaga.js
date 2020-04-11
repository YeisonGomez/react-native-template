import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/api/Api'
import * as TokenStorage from '../../common/storage/Token'
import { auth } from "./AuthActions"

function* login({ payload }) {
  const { ok, payload: response } = yield Api.post("/auth/login", payload)
  
  if (ok) {
    TokenStorage.save(response.payload);
    yield put(auth.loginResponse(response.payload));
  } else {
    const err = new TypeError(response?.error? response.error: 'ERROR_LOGIN')
    yield put(auth.loginResponse(err, response))
  }
}

function* signup({ payload }) {
  const { payload: response, ok } = yield Api.post('/auth/signup', payload.data);
  
  if (ok) {
    TokenStorage.save(response.payload)
    yield put(auth.signupResponse(response.payload));
  } else {
    const err = new TypeError(response?.error? response.error: 'ERROR_SIGNUP')
    yield put(auth.signupResponse(err))
  }
}
function* resetPassword(data) {
  const { ok, payload: response } = yield Api.post('/auth/request-forgot-password', data.payload);
  if (ok) {
    yield put(auth.resetPasswordResponse(response.success));
  } else {
    const err = new TypeError(response.error)
    yield put(auth.resetPasswordResponse(err))
  }
}

function* changePassword(data) {
  const { ok, payload: response } = yield Api.post('/auth/forgot-password', data.payload);
  if (ok) {
    yield put(auth.changePasswordResponse(response.success));
  } else {
    const err = new TypeError(response.error)
    yield put(auth.changePasswordResponse(err))
  }
}

function* logout() {
  yield TokenStorage.remove();
}

function* isLogged(){
  const isToken = yield TokenStorage.isToken()
  yield put(auth.setLogged(isToken))
}

function* ActionWatcher() {
  yield takeLatest(auth.login, login)
  yield takeLatest(auth.signup, signup)
  yield takeLatest(auth.logout, logout)
  yield takeLatest(auth.resetPassword, resetPassword)
  yield takeLatest(auth.changePassword, changePassword)
  yield takeLatest(auth.isLogged, isLogged)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}