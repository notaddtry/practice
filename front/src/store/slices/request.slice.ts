import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IRequest } from '../../types'
import { request } from '../../utils/http'

type InitialState = {
  requests: IRequest[]
  isNewNotification: boolean
}

const initialState: InitialState = {
  requests: [],
  isNewNotification: false,
}

const slicePrefix = 'request'

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
  `${slicePrefix}/searchMessages`,
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
  },
})

export default messageSlice.reducer
