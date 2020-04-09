import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  loading: false,
  phaseCurrent: undefined,
  roles: undefined,
  services: undefined,
  permissions: undefined
}

const reducer = handleActions({
  USER: {
    GET_PERMISSIONS: (state, { payload: { } }) => ({ ...state, loading: true }),
    GET_PERMISSIONS_RESPONSE: {
      next(state, { payload: { payload } }) {
        return { ...state, loading: false, ...payload }
      },
      throw(state, action) {
        return { ...state }
      }
    },

    GET_PROFILE: (state, { payload: { } }) => ({ ...state, loading: true }),
    GET_PROFILE_RESPONSE: {
      next(state, { payload: { profile } }) {
        return { ...state, profile }
      },
      throw(state, action) {
        return { ...state }
      }
    },

    PUT_PROFILE: (state, { payload: { } }) => ({ ...state, loading: true }),
    PUT_PROFILE_RESPONSE: {
      next(state, { payload: { success } }) {
        return { ...state, success }
      },
      throw(state, action) {
        return { ...state }
      }
    },
  }
},
  INITIAL_STATE
);

export default reducer;