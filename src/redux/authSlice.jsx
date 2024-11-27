import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"), // Check if token exists
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.userData;
      localStorage.setItem("token", action.payload.token); // Save token
      localStorage.setItem("user", JSON.stringify(action.payload.name));
      localStorage.setItem("role", JSON.stringify(action.payload.role));
      localStorage.setItem(
        "employeeId",
        JSON.stringify(action.payload.employeeId)
      );
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token"); // Remove token
      localStorage.removeItem("user"); // Remove user data
      localStorage.removeItem("role"); // Remove user data
      localStorage.removeItem("employeeId"); // Remove user data
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
