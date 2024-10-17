import React, { useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateAOrder } from '../features/auth/authSlice';
import OrderView from '../components/OrderView'; // Make sure to import the ViewOrders component

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  // {
  //   title: 'Status',
  //   dataIndex: 'status',
  // },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: 'Shipped', value: 'Shipped' },
      { text: 'Out for delivery', value: 'Out for delivery' },
      { text: 'Delivered', value: 'Delivered' },
    ],
    onFilter: (value, record) => record.status.includes(value),
    // sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

const NewList = () => {
  const dispatch = useDispatch();

  const getTokenFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ''
      }`,
      Accept: 'application/json',
    },
  };

  useEffect(() => {
    dispatch(getOrders(axiosConfig));
  }, []);

  const orderState = useSelector((state) => state.auth.orders);
  console.log(orderState);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name:
        orderState[i]?.user?.firstname + ' ' + orderState[i]?.user?.lastname,
      product: (
        <Link to={`/admin/orders/${orderState[i]?._id}`}>View Invoice</Link>
      ),
      amount: orderState[i]?.totalPriceAfterDiscount,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      status: orderState[i]?.orderStatus,
      actions: (
        <>
          <select
            name=""
            defaultValue={orderState[i]?.orderStatus}
            className="form-control form-selected"
            onChange={(e) =>
              updateOrderStatus(orderState[i]?._id, e.target.value)
            }
          >
            <option value="Ordered" disabled>
              Order Confirmed
            </option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }));
  };

  return (
    <div>
      <h3 className="mb-3 title">Orders</h3>
      <div>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <OrderView orderId={orderState[record.key - 1]?._id} />
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={data1}
        />
      </div>
    </div>
  );
};

export default NewList;
