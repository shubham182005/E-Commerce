import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import leadUserService from "./leaduserService";
import { toast } from "react-toastify";

export const createleadUser = createAsyncThunk(
  "leaduser/create-leaduser",
  async (leaduserData, thunkAPI) => {
    try {
      return await leadUserService.createleadUser(leaduserData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getleadUsers = createAsyncThunk(
  "leaduser/get-leadusers",
  async (thunkAPI) => {
    try {
      return await leadUserService.getleadUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAleadUser = createAsyncThunk(
  "leaduser/get-leaduser",
  async (id, thunkAPI) => {
    try {
      return await leadUserService.getAleadUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateleadUser = createAsyncThunk(
  "leaduser/update-leaduser",
  async (leaduser, thunkAPI) => {
    try {
      return await leadUserService.updateleadUser(leaduser);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteleadUser = createAsyncThunk(
  "leaduser/delete-leaduser",
  async (id, thunkAPI) => {
    try {
      return await leadUserService.deleteleadUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  leadusers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: "idle",
  message: "",
};

export const leadUserSlice = createSlice({
  name: "leadusers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getleadUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getleadUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.leadusers = action.payload;
      })
      .addCase(getleadUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createleadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createleadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.status = "succeeded";
        state.createdleadUser = action.payload;
      })
      .addCase(createleadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAleadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAleadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.leaduser = action.payload;
        //   state.blogName = action.payload.title;
        //   state.blogDescription = action.payload.description;
        //   state.blogCategory = action.payload.category;
        //   state.blogImages = action.payload.images;
      })
      .addCase(getAleadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateleadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateleadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedleaduser = action.payload;
      })
      .addCase(updateleadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteleadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteleadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedleaduser = action.payload;
      })
      .addCase(deleteleadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default leadUserSlice.reducer;
