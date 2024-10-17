import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import axios from "axios";
import { config } from "../../utils/axiosconfig";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  admins: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  OrderByUser: [],
  orderByDateRange: [],
  page: 1,
  limit: 5,
  totalOrders: 0,
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
//   try {
//     return await authService.login(email, password);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

// export const verifyOTP = createAsyncThunk('auth/verifyOTP', async ({ email, otp }, thunkAPI) => {
//   try {
//     return await authService.verifyOTP(email, otp);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });





export const getMonthlyData = createAsyncThunk(
  "orders/monthlydata",
  async (data, thunkAPI) => {
    try {
      return await authService.getMothlyOrders(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getYearlyData = createAsyncThunk(
  "orders/yearlydata",
  async (data, thunkAPI) => {
    try {
      return await authService.getYearlyStats(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (data, thunkAPI) => {
    try {
      return await authService.getOrders(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAOrder = createAsyncThunk(
  "order/update-order",
  async (data, thunkAPI) => {
    try {
      return await authService.updateOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const getOrdersByDateRange = createAsyncThunk(
//   'orders/getOrdersByDateRange',
//   async ({ startDate, endDate }, thunkAPI) => {
//     try {
//       const response = await axios.get(`/api/orders/range`, {
//         params: { startDate, endDate },
//         ...config
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
export const getOrdersByDateRange = createAsyncThunk(
  "orders/getOrdersByDateRange",
  async (
    { startDate, endDate, orderStatus, firstname, lastname, page, limit },
    thunkAPI
  ) => {
    try {
      return await authService.getOrdersByDate(
        startDate,
        endDate,
        orderStatus,
        firstname,
        lastname,
        page,
        limit
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   // state.user = action.payload;
      //   state.message = action.payload.message;
      // })
      // .addCase(verifyOTP.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.user = action.payload;
      // })
     
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleOrder = action.payload;
        state.message = "success";
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(getMonthlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlyData = action.payload;
        state.message = "success";
      })
      .addCase(getMonthlyData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(getYearlyData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
        state.message = "success";
      })
      .addCase(getYearlyData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(updateAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedOrder = action.payload;
        state.message = "success";
      })
      .addCase(updateAOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(getOrdersByDateRange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersByDateRange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orderByDateRange = action.payload;
        state.message = "success";
      })
      .addCase(getOrdersByDateRange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
