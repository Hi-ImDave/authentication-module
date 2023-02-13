import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import preferenceService from './preferenceService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  viewDark: user.settings.darkMode,
  fontSize: user.settings.fontSize,
  pureBlack: user.settings.pureBlack,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const setViewDark = createAsyncThunk(
  'preference/viewDark',
  async (data, thunkAPI) => {
    try {
      return await preferenceService.setViewDark(data)
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
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setViewDark.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setViewDark.fulfilled, (state, action) => {
        state.viewDark = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(setViewDark.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = preferenceSlice.actions

export default preferenceSlice.reducer
