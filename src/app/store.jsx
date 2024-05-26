import { configureStore } from "@reduxjs/toolkit";

// Import the auth reducer
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    // Add the auth reducer to the store
    auth: authReducer,
  },
});
