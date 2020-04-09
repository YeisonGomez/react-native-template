import { fork, all } from 'redux-saga/effects';

import AuthSaga from '../services/Auth/AuthSaga';
import UserSaga from '../services/User/UserSaga';
import UtilitiesSaga from '../services/Utilities/UtilitiesSaga';

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(UtilitiesSaga),
    fork(UserSaga)
  ]);
}