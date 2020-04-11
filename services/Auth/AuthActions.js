import { createActions } from 'redux-actions';

export const { auth } = createActions({
  AUTH: {
    LOGIN: (email, password) => ({ email, password }),
    LOGIN_RESPONSE: (token) => ({ token }),

    SIGNUP: (data) => ({ data }),
    SIGNUP_RESPONSE: () => ({ }),

    RESET_PASSWORD: (email) => ({ email }),
    RESET_PASSWORD_RESPONSE: (success) => ({ success }),

    CHANGE_PASSWORD: (password, code) => ({ password, code }),
    CHANGE_PASSWORD_RESPONSE: (success) => ({ success }),

    LOGOUT: () => ({ }),

    IS_LOGGED: () => ({ }),
    SET_LOGGED: (auth) => ({ auth }),
  }
})