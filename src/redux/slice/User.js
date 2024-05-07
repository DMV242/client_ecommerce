import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/User";

export const saveNewUser = createAsyncThunk("user", async (data) => {

  const response = await User.postUser(data);
  return response.data;
});
export const getAllUsers = createAsyncThunk("users", async (token) => {
  const response = await User.getAllUsers(token);
  return response.data;
});

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    message: "",
    status: "idle",
    users: []
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveNewUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(saveNewUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.user = action.payload;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.users = action.payload;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(saveNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload || "An error occurred during login";
        state.user = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload || "An error occurred during login";
        state.user = null;
      });
  },
});

export const selectUser = (state) => state.User.user;
export const selectUsers = (state) => state.User.users;
export const selectUserStatus = (state) => state.User.status;
export const selectError = (state) => state.User.error;

export default UserSlice.reducer;
