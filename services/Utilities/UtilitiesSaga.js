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
  /*Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
  Parse.initialize(
    'EWCNCcp2C0ECu60ESLCxQ2CvliRCcmZ94hGdWeq8', // This is your Application ID
    'xL9M2IPq28EEpaRwrVi1QtKVAhFYPjJr4owFLpT8', // This is your Javascript key
  );

  const Continentscountriescities_City = Parse.Object.extend('Continentscountriescities_Country');
  const query = new Parse.Query(Continentscountriescities_City);
  query.limit(255)
  const results = yield query.find() 

  if (results.length > 0) {
    yield put(utilities.getCountryResponse(results));
  } else {
    const err = new TypeError('ERROR_LOGIN')
    yield put(utilities.getCountryResponse(err))
  }*/
}

function* getCitys(data) {
  const countryObject = Parse.Object.extend('Continentscountriescities_Country');
  const queryCountry = new Parse.Query(countryObject);
  queryCountry.equalTo('name', data.payload.countryName)
  const country = yield queryCountry.find()

  const citysObject = Parse.Object.extend('Continentscountriescities_City');
  const query = new Parse.Query(citysObject);
  query.limit(10000)
  query.equalTo("country", country[0]);
  const resultsCitys = yield query.find()
  
  if (resultsCitys.length > 0) {
    yield put(utilities.getCitysResponse(resultsCitys));
  } else {
    const err = new TypeError('ERROR_GET_CITYS')
    yield put(utilities.getCitysResponse(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(utilities.language, Languages)
  yield takeLatest(utilities.getCountry, Countrys)
  yield takeLatest(utilities.getCitys, getCitys)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}