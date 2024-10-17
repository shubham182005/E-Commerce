import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../utils/axiosconfig";

const AddUser = () => {
  const [data, setData] = useState([]);
  const [agents, setAgents] = useState([]); // State to store agents
  const [formData, setFormData] = useState({
    Customer_Name: "",
    Customer_No: "",
    Alt_No: "",
    agent: "", // New field for agent selection
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const url = `http://localhost:8000/api/leaduser`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [leadUserResponse, agentResponse] = await Promise.all([
          axios.get(url, config),
          axios.get("http://localhost:8000/api/agent", config),
        ]);
        setData(leadUserResponse?.data);
        setAgents(agentResponse?.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(url, formData, config);
      const newUser = await response?.data;
      setData([...data, newUser]);
      setFormData({
        Customer_Name: "",
        Customer_No: "",
        Alt_No: "",
        agent: "", // Reset agent field
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEditItem = (id) => {
    const item = data.find((item) => item._id === id);
    setEditingItem(item);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  const handleSaveItem = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`${url}/${editingItem._id}`, editingItem, config);
      const updatedUser = await response?.data;
      setData(data.map((item) => (item._id === editingItem._id ? updatedUser : item)));
      setEditingItem(null);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${url}/${id}`, config);
      setData(data.filter((item) => item._id !== id));
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-4">
      <form onSubmit={handleSubmit} className=" mx-2">
        <label>First Name:</label>
        <input
          className="mb-3 bg-green-100"
          type="text"
          name="Customer_Name"
          value={formData.Customer_Name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Phone No:</label>
        <input
          className="mb-3 bg-green-100"
          type="number"
          name="Customer_No"
          value={formData.Customer_No}
          onChange={handleChange}
          required
        />
        <br />
        <label>Alt No:</label>
        <input
          className="mb-3 bg-green-100"
          type="number"
          name="Alt_No"
          value={formData.Alt_No}
          onChange={handleChange}
        />
        <br />
        <label>Assign Agent:</label>
        <select
          className="mb-3 bg-green-100"
          name="agent"
          value={formData.agent}
          onChange={handleChange}
          // required
        >
          <option value="">Select an agent</option>
        
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Form"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="mt-4">
        <h1 className="text-xl mb-2">Existing Users</h1>
        <div className="overflow-x-auto max-h-96 border border-gray-300 rounded-md shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alt No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{item._id}</td>
                  {editingItem && editingItem._id === item._id ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="Customer_Name"
                          value={editingItem.Customer_Name}
                          onChange={handleEditInputChange}
                          className="px-2 py-1 border rounded-md w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="Customer_No"
                          value={editingItem.Customer_No}
                          onChange={handleEditInputChange}
                          className="px-2 py-1 border rounded-md w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          name="Alt_No"
                          value={editingItem.Alt_No}
                          onChange={handleEditInputChange}
                          className="px-2 py-1 border rounded-md w-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          name="agent"
                          value={editingItem.agent}
                          onChange={handleEditInputChange}
                          className="px-2 py-1 border rounded-md w-full"
                        >
                          <option value="">Select an agent</option>
                          {agents.map((agent) => (
                            <option key={agent._id} value={agent._id}>
                              {agent.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={handleSaveItem}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          className="px-4 py-2 bg-gray-600 text-white rounded-md"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">{item.Customer_Name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.Customer_No}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.Alt_No}</td>
                      <td className="px-6 py-4 whitespace-nowrap">  {item?.agent?.name || "Not Assigned"}</td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleEditItem(item._id)}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
