import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  getAllUsers: [],
  getAllUsersLoading: false,
  getAllSuggestions: [],
  getAllSuggestionsLoading: false,
};

export const getUserData = createAsyncThunk("/user/getUserData", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/v1/user/Profile",
    {
      withCredentials: true,
    }
  );

  return response?.data;
});

export const logOutUser = createAsyncThunk("/user/logout", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/user/logout", {
    withCredentials: true,
  });

  return response?.data;
});

export const getAllUsers = createAsyncThunk(
  "/user/getAllUsers",
  async ()=> {
    const response = await axios.get("http://localhost:5000/api/v1/user/suggested-users",
      {
        withCredentials: true,
      }
    );

    return response?.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    setFollowOrUnFollow: (state, action) => {
      const userId = action.payload.userId;
      const user = state.user;

      if (user?.following?.includes(userId)) {
        state.user.following = state.user.following.filter(
          (id) => id !== userId
        );
      } else {
        state.user.following.push(userId);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;

        state.isAuthenticated = action.payload.success;
        state.user = action?.payload?.data || null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logOutUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;

        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.getAllUsersLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.getAllUsersLoading = false;
        state.getAllUsers = action?.payload?.data || null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.getAllUsersLoading = false;
      });
  },
});

export const { setUser, setFollowOrUnFollow } = authSlice.actions;
export default authSlice.reducer;
