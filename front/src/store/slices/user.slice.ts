import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IUser } from '../../types'
import { request } from '../../utils/http'

type InitialState = {
  user: IUser | null
}

const initialState: InitialState = {
  user: null,
}

const slicePrefix = 'user'

export const fetchMessages = createAsyncThunk(
  `${slicePrefix}/fetchMessages`,
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetch('/api/messages')

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const searchMessages = createAsyncThunk(
  `${slicePrefix}/fetchMessages`,
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await request(`/api/messages/?s=${query}`)

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const messageSlice = createSlice({
  name: slicePrefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // .addCase(fetchMessages.pending, (state) => {
    //   state.loading = true
    // })
    // .addCase(fetchMessages.fulfilled, (state, action) => {
    //   state.messages = action.payload
    //   state.loading = false
    // })
    // .addCase(fetchMessages.rejected, (state, action) => {
    //   state.loading = false
    //   state.error = action.error as IError
    // })

    // //searchMessages
    // .addCase(searchMessages.pending, (state) => {
    //   state.loading = true
    // })
    // .addCase(searchMessages.fulfilled, (state, action) => {
    //   state.messages = action.payload
    //   state.loading = false
    // })
    // .addCase(searchMessages.rejected, (state, action) => {
    //   state.loading = false
    //   state.error = action.error as IError
    // })
  },
})

export default messageSlice.reducer
