// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   DatePicker,
//   Button,
//   Form,
//   Select,
//   Skeleton,
//   Pagination,
//   Tabs,
// } from "antd";
// import { Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrders, updateAOrder } from "../features/auth/authSlice";
// import { motion } from "framer-motion";

// const { Option } = Select;
// const { TabPane } = Tabs;
// const { RangePicker } = DatePicker;

// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Product",
//     dataIndex: "product",
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//   },
//   {
//     title: "Date",
//     dataIndex: "date",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//   },
//   {
//     title: "Actions",
//     dataIndex: "actions",
//   },
// ];

// const Orders = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const getTokenFromLocalStorage = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null;

//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${
//         getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
//       }`,
//       Accept: "application/json",
//     },
//   };

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [orderStatus, setOrderStatus] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState({
//     firstname: "",
//     lastname: "",
//   });

//   const handleDateChange = (dates) => {
//     setDateRange(dates);
//     if (!dates[0] && !dates[1]) {
//       fetchOrders(); // Fetch all orders if date range is cleared
//     }
//   };

//   const fetchOrders = (
//     startDate = "",
//     endDate = "",
//     page = 1,
//     limit = itemsPerPage
//   ) => {
//     const data = {
//       startDate: startDate ? startDate : "",
//       endDate: endDate ? endDate : "",
//       page,
//       limit,
//       axiosConfig,
//     };
//     dispatch(getOrders(data));
//   };

//   useEffect(() => {
//     fetchOrders(); // Fetch all orders by default when component mounts
//   }, []);

//   useEffect(() => {
//     if (dateRange[0] && dateRange[1]) {
//       const [startDate, endDate] = dateRange;
//       fetchOrders(
//         startDate.format("YYYY-MM-DD"),
//         endDate.format("YYYY-MM-DD"),
//         currentPage,
//         itemsPerPage
//       );
//     } else if (!dateRange[0] && !dateRange[1]) {
//       fetchOrders("", "", currentPage, itemsPerPage); // Fetch all orders if date range is cleared
//     }
//   }, [dateRange, currentPage, itemsPerPage]);

//   const orderState = useSelector((state) => state?.auth?.orders);
//   const totalOrders = useSelector((state) => state?.auth?.totalOrders);

//   useEffect(() => {
//     fetchOrders("", "", currentPage, itemsPerPage);
//   }, [currentPage, itemsPerPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleLimitChange = (value) => {
//     setItemsPerPage(parseInt(value, 10));
//     setCurrentPage(1); // Reset to the first page when the limit changes
//   };

//   const data1 = [];
//   for (let i = 0; i < orderState?.length; i++) {
//     data1.push({
//       // key: i + 1,
//       key: (currentPage - 1) * itemsPerPage + i + 1,
//       name:
//         orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
//       product: (
//         <Link to={`/admin/orders/${orderState[i]?._id}`}>View Orders</Link>
//       ),
//       amount: orderState[i]?.totalPriceAfterDiscount,
//       date: new Date(orderState[i]?.createdAt).toLocaleString(),
//       status: orderState[i]?.orderStatus,
//       actions: (
//         <select
//           defaultValue={orderState[i]?.orderStatus}
//           className="form-control form-selected"
//           onChange={(e) =>
//             updateOrderStatus(orderState[i]?._id, e.target.value)
//           }
//         >
//           <option value="Ordered" disabled>
//             Order Confirmed
//           </option>
//           <option value="Shipped">Shipped</option>
//           <option value="Out for delivery">Out For Delivery</option>
//           <option value="Delivered">Delivered</option>
//         </select>
//       ),
//     });
//   }

//   const updateOrderStatus = (id, status) => {
//     dispatch(updateAOrder({ id, status }));
//   };

//   const handleClearDateRange = () => {
//     setDateRange([null, null]); // Reset dateRange to null
//     fetchOrders(); // Fetch all orders
//   };

//   const handleFilter = () => {
//     dispatch(getOrders({ orderStatus }));
//   };

//   const handleChange = (e) => {
//     setQuery({ ...query, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(getOrders(query));
//   };

//   // exporting json to csv
//   const handleExportCSV = () => {
//     const csvRows = [];
//     const headers = ["SNo", "Name", "", "Amount", "Date", "Time", "Status"];
//     csvRows.push(headers.join(","));

//     const csvData = orderState.map((order, index) => ({
//       key: (currentPage - 1) * itemsPerPage + index + 1,
//       name: `${order.user.firstname} ${order.user.lastname}`,
//       product: "View Orders", // You can replace this with actual product data
//       amount: `₹ ${order.totalPriceAfterDiscount}`,
//       date: new Date(order.createdAt).toLocaleString(),
//       status: order.orderStatus,
//     }));

//     csvData.forEach((row) => {
//       csvRows.push(
//         [row.key, row.name, row.product, row.amount, row.date, row.status].join(
//           ","
//         )
//       );
//     });

//     const csvContent = csvRows.join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "orders.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div>
//       <h3 className="mb-3 title">Orders</h3>
//       <div className="d-flex">
//         <div
//           className="mb-3"
//           style={{ display: "flex", justifyContent: "flex-end" }}
//         >
//           <RangePicker
//             className="mx-3"
//             format="YYYY-MM-DD"
//             onChange={handleDateChange}
//             value={dateRange}
//           />
//           <Button type="default" onClick={handleClearDateRange}>
//             Clear
//           </Button>
//           <Button
//             type="primary"
//             className="mx-3"
//             onClick={() =>
//               fetchOrders(
//                 dateRange[0]?.format("YYYY-MM-DD"),
//                 dateRange[1]?.format("YYYY-MM-DD")
//               )
//             }
//           >
//             Fetch Orders
//           </Button>
//         </div>

//         <Form layout="inline">
//           <Form.Item label="Order Status">
//             <Select
//               value={orderStatus}
//               onChange={(value) => setOrderStatus(value)}
//               style={{ width: 200 }}
//               defaultValue={orderStatus}
//               placeholder="Select Status"
//               className="text-indigo-900"
//             >
//               <Option value="Ordered" disabled>
//                 Order Confirmed
//               </Option>
//               <Option value="">All</Option>
//               <Option value="Shipped">Shipped</Option>
//               <Option value="Out for delivery">Out For Delivery</Option>
//               <Option value="Delivered">Delivered</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" onClick={handleFilter}>
//               Apply Filters
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//       <div
//         className="m-2 mb-3"
//         style={{ display: "flex", justifyContent: "flex-end" }}
//       >
//         <form onSubmit={handleSubmit} className="mb-3 mx-4">
//           <input
//             type="text"
//             name="firstname"
//             placeholder="First Name"
//             value={query.firstname}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="lastname"
//             placeholder="Last Name"
//             value={query.lastname}
//             onChange={handleChange}
//           />
//           <button type="submit">Search</button>
//         </form>
//         <Button type="primary" onClick={handleExportCSV}>
//           Export to CSV
//         </Button>
//       </div>
//       {loading ? (
//         <Skeleton active />
//       ) : (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <>
//             <Table
//               columns={columns}
//               dataSource={data1}
//               pagination={false}
//               className=""
//             />
//             <div
//               className=""
//               style={{ display: "flex", justifyContent: "flex-end" }}
//             >
//               <div>
//                 <label>
//                   Items per page:
//                   <select
//                     className="m-3 p-2"
//                     value={itemsPerPage}
//                     onChange={(e) => handleLimitChange(e.target.value)}
//                   >
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={20}>20</option>
//                     <option value={40}>40</option>
//                     <option value={50}>50</option>
//                     <option value={100}>100</option>
//                   </select>
//                 </label>
//               </div>
//               <div className="mt-3 p-2">
//                 <Button
//                   className="mx-1"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={
//                     currentPage === Math.ceil(totalOrders / itemsPerPage)
//                   }
//                 >
//                   Next
//                 </Button>
//                 <Button
//                   className="mx-1"
//                   onClick={() =>
//                     handlePageChange(Math.ceil(totalOrders / itemsPerPage))
//                   }
//                   disabled={
//                     currentPage === Math.ceil(totalOrders / itemsPerPage)
//                   }
//                 >
//                   Last
//                 </Button>
//               </div>
//               <Pagination
//                 className="mt-3 p-2"
//                 current={currentPage}
//                 pageSize={itemsPerPage}
//                 total={totalOrders} // Ensure totalOrders is set correctly
//                 onChange={handlePageChange}
//                 showSizeChanger={false}
//               />
//             </div>
//           </>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Orders;
import React, { useEffect, useState } from "react";
import {
  Table,
  DatePicker,
  Button,
  Form,
  Select,
  Skeleton,
  Pagination,
  Tabs,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
import { motion } from "framer-motion";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Orders = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState([null, null]);
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOrders = (
    startDate = "",
    endDate = "",
    status = "",
    page = 1,
    limit = itemsPerPage
  ) => {
    const data = {
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      orderStatus: status,
      page,
      limit,
      axiosConfig,
    };
    dispatch(getOrders(data));
  };

  useEffect(() => {
    fetchOrders("", "", orderStatus, currentPage, itemsPerPage);
  }, [dateRange, orderStatus, currentPage, itemsPerPage]);

  const orderState = useSelector((state) => state?.auth?.orders);
  const totalOrders = useSelector((state) => state?.auth?.totalOrders);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (value) => {
    setItemsPerPage(parseInt(value, 10));
    setCurrentPage(1); // Reset to the first page when the limit changes
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: (currentPage - 1) * itemsPerPage + i + 1,
      name:
        orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
      product: (
        <Link to={`/admin/orders/${orderState[i]?._id}`}>View Orders</Link>
      ),
      amount: orderState[i]?.totalPriceAfterDiscount,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      status: orderState[i]?.orderStatus,
      actions: (
        <select
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
      ),
    });
  }

  const updateOrderStatus = (id, status) => {
    dispatch(updateAOrder({ id, status }));
  };

  const handleExportCSV = () => {
    const csvRows = [];
    const headers = ["SNo", "Name", "Product", "Amount", "Date", "Status"];
    csvRows.push(headers.join(","));

    const csvData = orderState.map((order, index) => ({
      key: (currentPage - 1) * itemsPerPage + index + 1,
      name: `${order.user.firstname} ${order.user.lastname}`,
      product: "View Orders", // You can replace this with actual product data
      amount: `₹ ${order.totalPriceAfterDiscount}`,
      date: new Date(order.createdAt).toLocaleString(),
      status: order.orderStatus,
    }));

    csvData.forEach((row) => {
      csvRows.push(
        [row.key, row.name, row.product, row.amount, row.date, row.status].join(
          ","
        )
      );
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabChange = (key) => {
    setOrderStatus(key);
    setCurrentPage(1); // Reset to first page when changing tabs
    fetchOrders(
      dateRange[0]?.format("YYYY-MM-DD"),
      dateRange[1]?.format("YYYY-MM-DD"),
      key
    );
  };

  // Counting orders for each status
  const orderCounts = {
    all: totalOrders,
    shipped: orderState.filter((order) => order.orderStatus === "Shipped")
      .length,
    outForDelivery: orderState.filter(
      (order) => order.orderStatus === "Out for delivery"
    ).length,
    delivered: orderState.filter((order) => order.orderStatus === "Delivered")
      .length,
  };
  return (
    <div>
      <h3 className="mb-3 title">Orders</h3>
      <div className="d-flex mb-3">
        <RangePicker
          className="mx-3"
          format="YYYY-MM-DD"
          onChange={handleDateChange}
          value={dateRange}
        />
        <Button type="default" onClick={() => setDateRange([null, null])}>
          Clear Date
        </Button>
        <Button
          type="primary"
          className="mx-3"
          onClick={() =>
            fetchOrders(
              dateRange[0]?.format("YYYY-MM-DD"),
              dateRange[1]?.format("YYYY-MM-DD"),
              orderStatus
            )
          }
        >
          Fetch Orders
        </Button>
      </div>
      {/* <Tabs activeKey={orderStatus} onChange={handleTabChange}>
        <TabPane tab="All" key="">
          All Orders
        </TabPane>
        <TabPane tab="Shipped" key="Shipped">
          Shipped Orders  
        </TabPane>
        <TabPane tab="Out for delivery" key="Out for delivery">
          Out For Delivery Orders
        </TabPane>
        <TabPane tab="Delivered" key="Delivered">
          Delivered Orders
        </TabPane>
      </Tabs> */}
      <Tabs defaultActiveKey="" onChange={handleTabChange}>
        <TabPane tab={`All ${totalOrders}`} key="" />
        <TabPane tab={`Shipped ${orderCounts.shipped}`} key="Shipped" />
        <TabPane tab="Out for delivery" key="Out for delivery" />
        <TabPane tab="Delivered" key="Delivered" />
      </Tabs>
      {loading ? (
        <Skeleton active />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <>
            <Table columns={columns} dataSource={data1} pagination={false} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div>
                <label>
                  Items per page:
                  <select
                    className="m-3 p-2"
                    value={itemsPerPage}
                    onChange={(e) => handleLimitChange(e.target.value)}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </label>
              </div>
              <Pagination
                className="mt-3 p-2"
                current={currentPage}
                pageSize={itemsPerPage}
                total={totalOrders}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        </motion.div>
      )}
    </div>
  );
};

export default Orders;
