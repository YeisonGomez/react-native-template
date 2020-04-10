import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/api/Api'
import { utilities } from "./UtilitiesActions"

function* Languages() {
  const response = yield Api.get('/language/all')
  if (response.ok) {
    yield put(utilities.languageResponse(response.payload));
  } else {
    const err = new TypeError('ERROR_LOGIN')
    yield put(utilities.languageResponse(err))
  }
}

function* Countrys() {
  const response = yield fetch(
    'https://parseapi.back4app.com/classes/Country?limit=1000&order=name',
    {
      headers: {
        'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
        'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
      }
    }
  );

  const data = yield response.json();

  if (data?.results) {
    yield put(utilities.getCountrysResponse(data.results));
  } else {
    const err = new TypeError('ERROR_GET_COUNTRYS')
    yield put(utilities.getCountrysResponse(err))
  }
}

function* getCitys({ payload }) {
  const where = encodeURIComponent(JSON.stringify({
    "country": {
      "__type": "Pointer",
      "className": "Country",
      "objectId": payload.countryId,
    },
    "population": {
      "$gt": 10000 //Population >= 2000
    }
  }));

  const response = yield fetch(
    `https://parseapi.back4app.com/classes/City?count=1&limit=1000&order=name&where=${where}`,
    {
      headers: {
        'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
        'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
      }
    }
  );

  const data = yield response.json()

  if (data?.results) {
    yield put(utilities.getCitysResponse(data.results));
  } else {
    const err = new TypeError('ERROR_GET_CITYS')
    yield put(utilities.getCitysResponse(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(utilities.language, Languages)
  yield takeLatest(utilities.getCountrys, Countrys)
  yield takeLatest(utilities.getCitys, getCitys)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}