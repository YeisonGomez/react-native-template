import { createActions } from 'redux-actions';

export const { utilities } = createActions({
  UTILITIES: {

    LANGUAGE: () => ({}),
    LANGUAGE_RESPONSE: (languages) => ({ languages }),

    GET_COUNTRY: () => ({}),
    GET_COUNTRY_RESPONSE: (countrys) => ({ countrys }),

    GET_CITYS: (countryName) => ({countryName}),
    GET_CITYS_RESPONSE: (citys) => ({ citys }),

  }

})