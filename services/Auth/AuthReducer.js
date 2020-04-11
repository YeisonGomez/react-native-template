import { handleActions } from 'redux-actions';
import * as TokenStorage from '../../common/storage/Token';

export const INITIAL_STATE = {
  authentication: undefined,
  loading: false,
  error: {
    login: undefined,
    signup: undefined
  }
}

const reducer = handleActions({
  AUTH: {
    LOGIN: (state, { payload: { } }) => ({ 
      ...state, loading: true, error: { ...state.error, login: false } 
    }),
    LOGIN_RESPONSE: {
      next(state, { payload: { token } }) {
        return { ...state, token, authentication: true, loading: false }
      },
      throw(state, { payload: { message } }) {
        return { ...state, error: { ...state.error, login: message } , loading: false }
      }
    },

    SIGNUP: (state, { payload: { } }) => ({ 
      ...state, loading: true, error: { ...state.error, signup: false } 
    }),
    SIGNUP_RESPONSE: {
      next(state, { payload: { } }) {
        return { ...state, authentication: true, loading: false }
      },
      throw(state, { payload: { message } }) {
        return { ...state, error: { ...state.error, signup: message }, loading: false }
      }
    },

    RESET_PASSWORD: (state, { payload: { } }) => ({ ...state, loading: true, error: false, successRetore: false }),
    RESET_PASSWORD_RESPONSE: {
      next(state, { payload: { success } }) {
        return { ...state, success, loading: false }
      },
      throw(state, { error, payload: { message } }) {
        return { ...state, error, message, loading: false }
      }
    },

    CHANGE_PASSWORD: (state, { payload: { } }) => ({ ...state, loading: true, error: false, successRetore: false }),
    CHANGE_PASSWORD_RESPONSE: {
      next(state, { payload: { success } }) {
        return { ...state, successRetore: true, loading: false }
      },
      throw(state, { error, payload: { message } }) {
        return { ...state, error, message, loading: false }
      }
    },

    LOGOUT: (state, { payload: { } }) => ({ ...state, authentication: false }),

    SET_LOGGED: (state, { payload: { auth } }) => ({ ...state, authentication: auth? auth: false }),
  }
},
  INITIAL_STATE
);

export default reducer;