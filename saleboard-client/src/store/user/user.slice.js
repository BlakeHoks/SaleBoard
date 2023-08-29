import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, { payload }) => {
      state.id = payload.id
      state.role = payload.role
    },
    resetUser: (state, { payload }) => {
      state.id = ''
      state.role = ''
    },
  },
})

export const { actions, reducer } = userSlice
