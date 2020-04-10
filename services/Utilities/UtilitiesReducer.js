import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  languages: [],
  loading: false,
  countrys: [],
  citys: [],
  error: {
    getCountrys: false,
    getCities: false
  }
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

    GET_COUNTRYS: (state, { payload: { } }) => ({ 
      ...state, loading: true, error: { ...state.error, getCountrys: false } 
    }),
    GET_COUNTRYS_RESPONSE: {
      next(state, { payload: { countrys } }) {
        return { ...state, countrys, loading: false}
      },
      throw(state, action) {
        return { ...state, error: { ...state.error, getCountrys: true }, loading: false }
      }
    },

    GET_CITYS: (state, { payload: { } }) => ({ 
      ...state, citys: [], loading: true, error: { ...state.error, getCities: false } 
    }),
    GET_CITYS_RESPONSE: {
      next(state, { payload: { citys } }) {
        return { ...state, citys, loading: false }
      },
      throw(state, action) {
        return { ...state, error: { ...state.error, getCities: true }, loading: false }
      }
    }

  }
},
  INITIAL_STATE
);

export default reducer;