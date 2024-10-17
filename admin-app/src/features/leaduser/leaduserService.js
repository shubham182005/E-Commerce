import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getleadUsers = async () => {
  const response = await axios.get(`${base_url}leaduser/`);
  return response.data;
};

const createleadUser = async (leaduser) => {
  const response = await axios.post(`${base_url}leaduser/`, leaduser, config);

  return response.data;
};
const updateleadUser = async (leaduser) => {
  const response = await axios.put(
    `${base_url}leaduser/${leaduser.id}`,
    // { name: agent.agentData.name },
    // { phone: agent.agentData.phone },
    // { email: agent.agentData.email },
    leaduser,
    config
  );

  return response.data;
};
const getAleadUser = async (id) => {
  const response = await axios.get(`${base_url}leaduser/${id}`, config);
  return response.data;
};

const deleteleadUser = async (id) => {
  const response = await axios.delete(`${base_url}leaduser/${id}`, config);
  return response.data;
};

const leadUserService = {
  getleadUsers,
  createleadUser,
  getAleadUser,
  deleteleadUser,
  updateleadUser,
};
export default leadUserService;
