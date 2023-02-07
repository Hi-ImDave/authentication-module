import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import preferenceService from './preferenceService'

const initialState = {
  viewMode: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const setViewMode = createAsyncThunk(
  'preference/viewMode',
  async (data, thunkAPI) => {
    try {
      console.log(data)
      return await preferenceService.setViewMode(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {
    reset: (state) => {
      state.viewMode = false
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setViewMode.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setViewMode.fulfilled, (state, action) => {
        state.viewMode = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(setViewMode.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = preferenceSlice.actions

export default preferenceSlice.reducer
