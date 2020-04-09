import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  languages: [],
  loading: false,
  countrys: [],
  citys: []
}

const reducer = handleActions({
  UTILITIES: {
    
    LANGUAGE: (state, { payload: { } }) => ({ ...state, loading: true }),
    LANGUAGE_RESPONSE: {
      next(state, { payload: { languages } }) {
        return { ...state, languages, loading: false }
      },
      throw(state, action) {
        return { ...state, loading: false }
      }
    },

    GET_COUNTRY: (state, { payload: { } }) => ({ ...state, loading: true }),
    GET_COUNTRY_RESPONSE: {
      next(state, { payload: { countrys } }) {
        return { ...state, countrys, loading: false}
      },
      throw(state, action) {
        return { ...state, loading: false }
      }
    },

    GET_CITYS: (state, { payload: { } }) => ({ ...state, citys: [], loading: true }),
    GET_CITYS_RESPONSE: {
      next(state, { payload: { citys } }) {
        return { ...state, citys, loading: false }
      },
      throw(state, action) {
        return { ...state, loading: false }
      }
    }

  }
},
  INITIAL_STATE
);

export default reducer;