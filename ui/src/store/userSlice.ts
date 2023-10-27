import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  userId: string | null; // You can use the appropriate data type for userId
}

const initialState: UserState = {
  isLoggedIn: false,
  userId: null, // Initialize userId as null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null; // Clear userId when logging out
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
