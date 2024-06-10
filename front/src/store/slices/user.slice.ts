import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { IUser } from '../../types'

type InitialState = {
  user: IUser | null
}

const initialState: InitialState = {
  user: null,
}

const slicePrefix = 'user'

const userSlice = createSlice({
  name: slicePrefix,
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null
    },
    loginUser(state, payload: PayloadAction<IUser>) {
      if (payload) {
        state.user = payload.payload
      }
    },
  },
})

export const { logoutUser, loginUser } = userSlice.actions

export default userSlice.reducer
