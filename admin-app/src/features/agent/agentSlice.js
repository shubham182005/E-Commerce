import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import agentService from "./agentService";
import { toast } from "react-toastify";

export const createAgents = createAsyncThunk(
  "agent/create-agents",
  async (agentData, thunkAPI) => {
    try {
      return await agentService.createAgent(agentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAgents = createAsyncThunk(
  "agent/get-agents",
  async (thunkAPI) => {
    try {
      return await agentService.getAgents();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAAgent = createAsyncThunk(
  "agent/get-agent",
  async (id, thunkAPI) => {
    try {
      return await agentService.getAgent(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAAgent = createAsyncThunk(
  "agent/update-agent",
  async (agent, thunkAPI) => {
    try {
      return await agentService.updateAgent(agent);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAAgent = createAsyncThunk(
  "agent/delete-agent",
  async (id, thunkAPI) => {
    try {
      return await agentService.deleteAgent(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  agents: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: "idle",
  message: "",
};

export const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAgents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAgents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.agents = action.payload;
      })
      .addCase(getAgents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createAgents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAgents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.status = "succeeded";
        state.createdAgent = action.payload;
      })
      .addCase(createAgents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAAgent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.agent = action.payload;
        //   state.blogName = action.payload.title;
        //   state.blogDescription = action.payload.description;
        //   state.blogCategory = action.payload.category;
        //   state.blogImages = action.payload.images;
      })
      .addCase(getAAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAAgent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedAgent = action.payload;
      })
      .addCase(updateAAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAAgent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedAgent = action.payload;
      })
      .addCase(deleteAAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default agentSlice.reducer;
