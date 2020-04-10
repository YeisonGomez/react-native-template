import { createActions } from 'redux-actions';

export const { utilities } = createActions({
  UTILITIES: {

    LANGUAGE: () => ({}),
    LANGUAGE_RESPONSE: (languages) => ({ languages }),

    GET_COUNTRYS: () => ({}),
    GET_COUNTRYS_RESPONSE: (countrys) => ({ countrys }),

    GET_CITYS: (countryId) => ({countryId}),
    GET_CITYS_RESPONSE: (citys) => ({ citys })
  }
})