import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"), // Check if token exists
  user: JSON.parse(localStorage.getItem("user")) || null,
  role: JSON.parse(localStorage.getItem("role")) || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { userData, token } = action.payload;
      state.isAuthenticated = true;
      state.user = userData;
      state.role = userData.role;
      state.token = token;

      // Save to localStorage
      localStorage.setItem("token", token); // Save token
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data
      localStorage.setItem("role", JSON.stringify(userData.role)); // Save role
      localStorage.setItem("employeeId", JSON.stringify(userData.employeeId)); // Save employeeId
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.token = null;

      // Remove from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("employeeId");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
