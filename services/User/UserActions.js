import { createActions } from 'redux-actions';

export const { user } = createActions({
  USER: {
    GET_PERMISSIONS: () => ({}),
    GET_PERMISSIONS_RESPONSE: (payload) => ({ payload }),

    GET_PROFILE: () => ({}),
    GET_PROFILE_RESPONSE: (profile) => ({ profile }),

    PUT_PROFILE: (data) => ({ data }),
    PUT_PROFILE_RESPONSE: (success) => ({ success })
  }
})