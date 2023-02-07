import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import mailReducer from '../features/mail/mailSlice'
import preferenceReducer from '../features/preferences/preferenceSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mail: mailReducer,
    preference: preferenceReducer,
  },
})
