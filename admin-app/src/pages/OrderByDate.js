import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersByDateRange } from '../features/auth/authSlice';

const OrderListByDateRange = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dispatch = useDispatch();
  const { orderByDateRange, isLoading, isError, message } = useSelector((state) => state.auth);

  const handleFetchOrders = () => {
    dispatch(getOrdersByDateRange({ startDate, endDate }));
  };

  return (
    <div>
      <h2>Order List by Date Range</h2>
      <div>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={handleFetchOrders}>Fetch Orders</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {message}</p>}
      {orderByDateRange && orderByDateRange.length > 0 && (
        <div>
          <h3>Order Summary</h3>
          <p>Order Count: {orderByDateRange[0]?.count || 0}</p>
          <p>Total Amount: ${orderByDateRange[0]?.amount || 0}</p>
        </div>
      )}
      {!isLoading && !isError && orderByDateRange && orderByDateRange.length === 0 && (
        <p>No orders found for the selected date range.</p>
      )}
    </div>
  );
};

export default OrderListByDateRange;
