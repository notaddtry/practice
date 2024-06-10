import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit'
import requestSlice from './slices/request.slice'
import userSlice from './slices/user.slice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    request: requestSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
