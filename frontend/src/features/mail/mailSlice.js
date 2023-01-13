import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import mailService from './mailService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Send verification email
export const sendVerification = createAsyncThunk(
  'mail/sendVerification',
  async (user, thunkAPI) => {
    try {
      return await mailService.sendVerification(user)
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

// Send password reset email
export const sendReset = createAsyncThunk(
  'mail/sendReset',
  async (email, thunkAPI) => {
    try {
      return await mailService.sendReset(email)
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

export const mailSlice = createSlice({
  name: 'mail',
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
      .addCase(sendVerification.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendVerification.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(sendVerification.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(sendReset.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendReset.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(sendReset.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = mailSlice.actions

export default mailSlice.reducer
