import axios from 'axios';

const API_URL = "https://sheetdb.io/api/v1/jhfjrq14guvep";

export const getAllData = async () => {
  return await axios.get(API_URL);
};

export const createData = async (data) => {
  return await axios.post(API_URL, data);
};

export const updateData = async (id, data) => {
  return await axios.put(`${API_URL}/${id}`, data);
};

export const deleteData = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
