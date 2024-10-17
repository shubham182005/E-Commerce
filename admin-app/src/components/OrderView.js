import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../features/auth/authSlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    render: (image) => <img src={image} alt="product" style={{ width: '50px', height: '50px' }} />,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
];

const OrderView = ({ orderId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [orderId]);

  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
      color: orderState?.orderItems[i]?.color?.title,
      date: new Date(orderState?.createdAt).toLocaleString(),
      count: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[i]?.price,
      image: orderState?.orderItems[i]?.product?.images[0]?.url,
    });
  }

  return (
    <div>
      <h3 className="mb-3 title">View User Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} pagination={false}/>
      </div>
    </div>
  );
};

export default OrderView;
