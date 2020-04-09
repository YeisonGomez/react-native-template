import { combineReducers } from 'redux'

import { auth } from '../services/Auth//AuthActions';
import reducerAuth from '../services/Auth/AuthReducer';
import reducerUser from '../services/User/UserReducer';
import reducerUtilities from '../services/Utilities/UtilitiesReducer';

const appReducer = (history) => combineReducers({
  auth: reducerAuth,
  user: reducerUser,
  utilities: reducerUtilities
})

const rootReducer = (history) => {
  return (state, action) => {
    if (action.type == auth.logout) state = undefined
    return appReducer(history)(state, action);
  }
}
export default rootReducer;