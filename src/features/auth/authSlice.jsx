import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    // Action to set the token
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Export the action creator
export const { setToken } = authSlice.actions;

// Selectors to access the token from the state
export const selectToken = (state) => state.auth.token;

// Export the reducer
export default authSlice.reducer;
