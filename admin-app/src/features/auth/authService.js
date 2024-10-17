import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// const login = async (user) => {
//   const response = await axios.post(`${base_url}user/admin-login`, user);
//   if (response.data) {
//     localStorage.setItem("user", JSON.stringify(response.data));
//   }
//   return response.data;
// };
const login = async (email, password) => {
  const response = await axios.post(`${ base_url}user/admin-login`, { email, password });
  // if(response.data){
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }
  return response.data;
};

const verifyOTP = async (email, otp) => {
  const response = await axios.post(`${ base_url}user/verify-otp`, { email, otp });
  if(response.data){
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};


const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/getaorder/${id}`, config);
  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateorder/${data.id}`,
    { status: data.status },
    config
  );
  return response.data;
};

const getMothlyOrders = async (data) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    data
  );

  return response.data;
};

const getYearlyStats = async (data) => {
  const response = await axios.get(`${base_url}user/getyearlyorders`, data);
  return response.data;
};

const getOrdersByDate = async (startDate, endDate, orderStatus,firstname, lastname,page,limit) => {
  const response = await axios.get(`${base_url}user/getordersByDate`, {
    params: { startDate, endDate,orderStatus,firstname, lastname,page,limit},
    ...config
  });
  return response.data;
};

const getOrders = async (data) => {
  const response = await axios.get(`${base_url}user/getallorders`, {
    params: data,
    ...config
  });
  return response.data;
};

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

const authService = {
  login,
  verifyOTP,
  getOrders,
  getOrder,
  getMothlyOrders,
  getYearlyStats,
  updateOrder,
  getOrdersByDate,
 
};

export default authService;
