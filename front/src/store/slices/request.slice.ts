import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IRequestWithSeen } from '../../types'
import { request, seeRequest } from '../../utils/http'

type InitialState = {
  newRequests: IRequestWithSeen[]
  isNewNotification: boolean
}

const initialState: InitialState = {
  newRequests: [],
  isNewNotification: false,
}

const slicePrefix = 'request'

export const seeRequestHandler = createAsyncThunk(
  `${slicePrefix}/seeRequest`,
  async (
    body: { user_id: number; request_id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await seeRequest(body)

      return res
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

const requestSlice = createSlice({
  name: slicePrefix,
  initialState,
  reducers: {
    pushNewNotification(state, payload: PayloadAction<IRequestWithSeen[]>) {
      state.newRequests = payload.payload
      if (payload.payload.length) {
        state.isNewNotification = true
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(seeRequestHandler.fulfilled, (state, action) => {
      state.newRequests = state.newRequests.filter(
        (req) => req.id !== (action.payload as IRequestWithSeen[])[0].id
      )
      if (!state.newRequests.length) {
        state.isNewNotification = false
      }
    })
  },
})

export default requestSlice.reducer

export const { pushNewNotification } = requestSlice.actions
