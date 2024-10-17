import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';



const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const customerState = useSelector((state) => state.customer.customers);
  console.log("cm",customerState);

  const data1 = [];
  for (let i = 0; i < customerState.length; i++) {
    if (customerState[i].role !== 'admin') {
      data1.push({
        key: i,
        name: customerState[i].firstname + ' ' + customerState[i].lastname,
        email: customerState[i].email,
        mobile: customerState[i].mobile,
      });
    }
  }
  const admins = customerState.filter((user) => user.role === "admin");
  const editors = customerState.filter((user) => user.role === "editor");
  return (
    <div>
      <h3 className="mb-3 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>
            {admin.firstname} {admin.lastname} - {admin.email} -  {admin.mobile}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
