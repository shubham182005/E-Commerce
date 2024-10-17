import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getAgents = async () => {
  const response = await axios.get(`${base_url}agent/`);
  return response.data;
};

const createAgent = async (agent) => {
  // console.log(blog);
  const response = await axios.post(`${base_url}agent/`, agent, config);

  return response.data;
};
const updateAgent = async (agent) => {
  const response = await axios.put(
    `${base_url}agent/${agent.id}`,
    { name: agent.agentData.name },
    { phone: agent.agentData.phone },
    { email: agent.agentData.email },
    config
  );

  return response.data;
};
const getAgent = async (id) => {
  const response = await axios.get(`${base_url}agent/${id}`, config);
  return response.data;
};

const deleteAgent = async (id) => {
  const response = await axios.delete(`${base_url}agent/${id}`, config);
  return response.data;
};

const agentService = {
  getAgents,
  createAgent,
  getAgent,
  deleteAgent,
  updateAgent,
};
export default agentService;
