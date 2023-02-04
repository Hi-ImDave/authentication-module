import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import mailService from './mailService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Send invite email
export const sendInvite = createAsyncThunk(
  'mail/sendInvite',
  async (inviteData, thunkAPI) => {
    try {
      return await mailService.sendInvite(inviteData)
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

// Request password reset
export const resetRequest = createAsyncThunk(
  'mail/resetRequest',
  async (email, thunkAPI) => {
    try {
      return await mailService.resetRequest(email)
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

// Confirm password reset
export const resetConfirm = createAsyncThunk(
  'mail/resetConfirm',
  async (userId, thunkAPI) => {
    try {
      return await mailService.resetConfirm(userId)
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
      .addCase(sendInvite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendInvite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(sendInvite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(sendVerification.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendVerification.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(sendVerification.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(resetRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(resetRequest.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(resetConfirm.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetConfirm.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(resetConfirm.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = mailSlice.actions

export default mailSlice.reducer
