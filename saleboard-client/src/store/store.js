import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as userReducer } from './user/user.slice.js'

const reducers = combineReducers({ user: userReducer })
export const store = configureStore({
  reducer: reducers,
})
