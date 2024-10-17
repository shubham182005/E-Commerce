import React, { useState } from "react";

const ExcelTable = () => {
  const [data, setData] = useState([
    // { id: 1, name: "Item 1", value: 10 },
    // { id: 2, name: "Item 2", value: 20 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", value: "" });
  const [editingItem, setEditingItem] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    // Trim spaces and check if name or value is empty
    if (newItem.name.trim() === "" || newItem.value.trim() === "") {
      alert("Please fill out both the name and value fields.");
      return;
    }

    setData([...data, { id: data.length + 1, ...newItem }]);
    setNewItem({ name: "", value: "" });
  };

  const handleEditItem = (id) => {
    const item = data.find((item) => item.id === id);
    setEditingItem(item);
  };

  const handleSaveItem = () => {
    setData(
      data.map((item) => (item.id === editingItem.id ? editingItem : item))
    );
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Excel-like Table</h1>
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
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                {editingItem && editingItem.id === item.id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        name="name"
                        value={editingItem.name}
                        onChange={handleEditInputChange}
                        className="px-2 py-1 border rounded-md w-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        name="value"
                        value={editingItem.value}
                        onChange={handleEditInputChange}
                        className="px-2 py-1 border rounded-md w-full"
                      />
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
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleEditItem(item.id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
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
      <h2 className="text-xl font-bold mt-6 mb-2">Add New Item</h2>
      <div className="space-x-2">
        <input
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="px-4 py-2 border rounded-md"
        />
        <input
          name="value"
          value={newItem.value}
          onChange={handleInputChange}
          placeholder="Value"
          className="px-4 py-2 border rounded-md"
        />
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ExcelTable;
