import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authService from './authService'

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  pending: [],
  users: [],
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Invite new user
export const inviteUser = createAsyncThunk(
  'auth/invite',
  async (data, thunkAPI) => {
    try {
      return await authService.inviteUser(data)
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

// Register new user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
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

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// Login with google

// Update user
export const update = createAsyncThunk(
  'auth/updateUser',
  async (user, thunkAPI) => {
    try {
      return await authService.update(user)
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

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// Verify email address
export const verify = createAsyncThunk(
  'auth/verify',
  async (user, thunkAPI) => {
    try {
      return await authService.verify(user)
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

// Reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (user, thunkAPI) => {
    try {
      return await authService.resetPassword(user)
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

// Get all users
export const getUsers = createAsyncThunk('auth/getAll', async (_, thunkAPI) => {
  try {
    return await authService.getUsers()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// Get pending invites
export const getPending = createAsyncThunk(
  'auth/getPending',
  async (_, thunkAPI) => {
    try {
      return await authService.getPending()
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

// Delete user
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (userID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.deleteUser(userID, token)
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

// Delete pending invite
export const deleteInvite = createAsyncThunk(
  'auth/deleteInvite',
  async (inviteID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.deleteInvite(inviteID, token)
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

// Mute/unmute user
export const muteUser = createAsyncThunk(
  'auth/muteUser',
  async (userID, thunkAPI) => {
    try {
      return await authService.muteUser(userID)
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

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(inviteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(inviteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(verify.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload // ??? set to null?
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPending.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPending.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pending = action.payload
      })
      .addCase(getPending.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteInvite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteInvite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.pending.filter((invite) => invite._id !== action.payload._id)
      })
      .addCase(deleteInvite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users.filter((user) => user._id !== action.payload._id)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(muteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(muteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(muteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = authSlice.actions

export default authSlice.reducer
