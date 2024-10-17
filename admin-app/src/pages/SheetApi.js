import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { getAllData, createData, updateData, deleteData } from '../features/sheet/sheetServices';

const SheetApi = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllData();
      setData(response.data);
      setFilteredData(response.data); // Initialize filteredData with all data
    } catch (error) {
      message.error('Failed to fetch data.');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter((item) => item.Customer_Name.toLowerCase().includes(value));
    setFilteredData(filtered);
  };

  const handleAdd = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      message.success('Record deleted successfully.');
      fetchData();
    } catch (error) {
      message.error('Failed to delete record.');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = form.getFieldsValue();
      if (editingRecord) {
        await updateData(editingRecord.id, values);
        message.success('Record updated successfully.');
      } else {
        await createData(values);
        message.success('Record added successfully.');
      }
      setIsModalOpen(false);
      form.resetFields();
      fetchData();
    } catch (error) {
      message.error('Failed to save record.');
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    // { title: 'ID', dataIndex: '_id', key: 'id' },
    { title: 'Prepaid', dataIndex: 'Prepaid', key: 'Prepaid' },
    { title: 'Status', dataIndex: 'Status', key: 'Status' },
    { title: 'Source', dataIndex: 'Source', key: 'Source' },
    { title: 'Time', dataIndex: 'Time', key: 'Time' },
    { title: 'Type', dataIndex: 'Type', key: 'Type' },
    { title: 'Method', dataIndex: 'Method', key: 'Method' },
    { title: 'date', dataIndex: 'date', key: 'date' },
    { title: 'Agent', dataIndex: 'Agent', key: 'Agent' },
    // { title: 'Cust Name', dataIndex: 'Cust Name', key: 'Cust Name' },
    { title: 'Customer_Name', dataIndex: 'Customer_Name', key: 'Customer_Name' },
    { title: 'Alt No', dataIndex: 'Alt_No', key: 'Alt_No' },
    { title: 'Address', dataIndex: 'Address', key: 'Address' },
    { title: 'Area', dataIndex: 'Area', key: 'Area' },
    { title: 'State', dataIndex: 'State', key: 'State' },
    { title: 'Pincode', dataIndex: 'Pincode', key: 'Pincode' },
    { title: 'City', dataIndex: 'City', key: 'City' },
    { title: 'Price', dataIndex: 'Price', key: 'Price' },
    { title: 'Disease', dataIndex: 'Disease', key: 'Disease' },
    { title: 'Gasofine powder', dataIndex: 'Gasofine powder', key: 'Gasofine powder' },
    { title: 'Refresh Powder', dataIndex: 'Refresh Powder', key: 'Refresh Powder' },
    { title: 'Constirelex Powder', dataIndex: 'Constirelex_Powder', key: 'Constirelex_Powder' },
    { title: 'Icerose Powder', dataIndex: 'Icerose_Powder', key: 'Icerose_Powder' },
    { title: 'Lexolite Teblet', dataIndex: 'Lexolite_Teblet', key: 'Lexolite_Teblet' },
    { title: 'Amrutam Teblet', dataIndex: 'Amrutam_Teblet', key: 'Amrutam_Teblet' },
    { title: 'Courier', dataIndex: 'Courier', key: 'Courier' },
    { title: 'Tracking ID', dataIndex: 'Tracking_id', key: 'Tracking_id' },
    { title: 'Agent1', dataIndex: 'Agent1', key: 'Agent1' },
    { title: 'Remarks1', dataIndex: 'Remarks1', key: 'Remarks1' },
    { title: 'Date1', dataIndex: 'Date1', key: 'Date1' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEdit(record)} type="link">Edit</Button>
          <Button onClick={() => handleDelete(record.id)} type="link" danger>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Input 
        placeholder="Search by Customer Name"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add New
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" scroll={{ x: 'max-content' }} />

      <Modal
        title={editingRecord ? 'Edit Record' : 'Add New Record'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input email!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SheetApi;
