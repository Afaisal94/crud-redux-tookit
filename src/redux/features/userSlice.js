import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data;
});

export const getUserById = createAsyncThunk("user/getUserById", async (id) => {
  const response = await axios.get(`${baseUrl}/users/${id}`);
  return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete(`${baseUrl}/users/${id}`);
  return id;
});

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ name, username, email }) => {
    const response = await axios.post(`${baseUrl}/users/`, {
      name,
      username,
      email,
    });
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, name, username, email }) => {
    const response = await axios.patch(`${baseUrl}/users/${id}`, {
      name,
      username,
      email,
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isLoading: false,
    isError: "",
  },
  extraReducers: {
    // GET USERS
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.isError = "";
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.isError = action.error.message;
    },

    // GET USER BY ID
    [getUserById.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = "";
    },
    [getUserById.rejected]: (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.isError = action.error.message;
    },

    // DELETE USER
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // CREATE USER
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // UPDATE USER
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = [action.payload];
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default userSlice.reducer;
