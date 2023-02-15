import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import preferenceService from './preferenceService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  viewDark: user.settings.darkMode,
  fontSize: user.settings.fontSize,
  pureBlack: user.settings.pureBlack,
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
      state.viewDark = user.settings.darkMode
      state.fontSize = user.settings.fontSize
      state.pureBlack = user.settings.pureBlack
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setViewDark.fulfilled, (state, action) => {
        state.viewDark = action.payload.darkMode
        state.fontSize = action.payload.fontSize
        state.pureBlack = action.payload.pureBlack
        state.message = action.payload
      })
      .addCase(setViewDark.rejected, (state, action) => {
        state.message = action.payload
      })
  },
})

export const { reset } = preferenceSlice.actions

export default preferenceSlice.reducer
