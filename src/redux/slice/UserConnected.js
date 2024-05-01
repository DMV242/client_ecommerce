import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../services/User";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await User.getUser({ email, password });
      const { token, ...userDetails } = response.data;
      localStorage.setItem("token", token);
      return { user: userDetails, token };
    } catch (error) {
      const errorMessage = error.response?.data || "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginGoogleUser = createAsyncThunk(
  "user/login/google",
  async ({ email, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await User.getUserGoogle({ email, firstName, lastName });
      localStorage.setItem("token", response.data.token);
      return { user: response.data, token: response.data.token };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error occurred");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await User.deleteUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete user.");
    }
  }
);

export const profileUser = createAsyncThunk(
  "user/one-user",
  async (token, { rejectWithValue }) => {
    try {
      const response = await User.getOneUser(token);
      const { ...userDetails } = response.data;
      return { user: userDetails };
    } catch (error) {
      const errorMessage = error.response?.data || "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const postInfoUser = createAsyncThunk(
  "user/postInfo",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await User.postInfoUser(data, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to post user info."
      );
    }
  }
);

export const userConnectedSlice = createSlice({
  name: "UserConnected",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    token: localStorage.getItem("token") || null,
    status: "idle",
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
      })
      .addCase(loginGoogleUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginGoogleUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginGoogleUser.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postInfoUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postInfoUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(postInfoUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(profileUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(profileUser.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const selectUserConnected = (state) => state.UserConnected.user;
export const { logoutUser } = userConnectedSlice.actions;
export default userConnectedSlice.reducer;
