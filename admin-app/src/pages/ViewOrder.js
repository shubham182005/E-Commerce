import React, { useEffect } from "react";
import { Table } from "antd";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <img
        src={image}
        alt="product"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Quantity",
    dataIndex: "count",
  },
  {
    title: "color",
    dataIndex: "color",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const ViewOrders = () => {
  const location = useLocation();
  const orderid = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(orderid));
  }, [orderid]);

  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);
  console.log(orderState);

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
  const totalAmount = data1.reduce(
    (total, item) => total + item.amount * item.count,
    0
  );
  return (
    <div>
      <h3 className="mb-3 title">View User Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
     
      <div className="">
        <div className="invoice-box mt-1">
          <div className="row mb-4">
            <div className="col-6">
              <h1 className="invoice-title text-uppercase  mb-2">Sajivan Ayurveda </h1>
              <p className="mt-5">
                <strong >Bill to:</strong>
                <br />
                Sara Williams
                <br />
                280 Suzanne Throughway,
                <br />
                Breannabury, OR 45801,
                <br />
                United States
              </p>
            </div>
            <div className="col-6 text-end">
              <h4>Invoice #</h4>
              <p>{orderState?._id}</p>
              <p className="invoice-date">Invoice date : {new Date(orderState?.createdAt).toLocaleString()},</p>
              <p className="invoice-due-date">Due date: {new Date(orderState?.updatedAt).toLocaleString()}</p>
              <address>
              702/703, Elight Meghnum,
                <br />
                Near:- Solaris Business Hub,
                <br />
                Opp:- Ustav Elegance, Bhuyangdev Cross Road,
                <br />
                Ghatlodiya, Ahmedabad, Gujarat- 380061
              </address>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              {/* <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th className="text-center">QTY</th>
                    <th className="text-center">RATE</th>
                    <th className="text-end">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Design UX and UI</td>
                    <td className="text-center">1</td>
                    <td className="text-center">$500</td>
                    <td className="text-end">$500</td>
                  </tr>
                  <tr>
                    <td>Web project</td>
                    <td className="text-center">1</td>
                    <td className="text-center">$1250</td>
                    <td className="text-end">$1250</td>
                  </tr>
                  <tr>
                    <td>SEO</td>
                    <td className="text-center">1</td>
                    <td className="text-center">$2000</td>
                    <td className="text-end">$2000</td>
                  </tr>
                </tbody>
              </table> */}
               <Table columns={columns} dataSource={data1} pagination={false} />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>
                Thank you!
                <br />
                If you have any questions concerning this invoice, use the
                following contact information:
                <br />
                sajivanayurveda@gmail.com.com
                <br />
                +91 8490059352
              </p>
            </div>
            <div className="col-6 text-end">
              <table className="table">
                <tbody>
                  <tr className="total-row">
                    <td>Subtotal:</td>
                    <td className="text-end">₹ {orderState?.totalPrice}</td>
                  </tr>
                  <tr className="total-row">
                    <td>Shipping:</td>
                    <td className="text-end">Free</td>
                  </tr>
                  <tr className="total-row">
                    <td>Discount:</td>
                    <td className="text-end">₹ 0.00</td>
                  </tr>
                  <tr className="total-row">
                    <td>Taxes:</td>
                    <td className="text-end">12% (Included With Price)</td>
                  </tr>
                  <tr className="total-row">
                    <td>Total:</td>
                    <td className="text-end">₹ {orderState?.totalPriceAfterDiscount}</td>
                  </tr>
                </tbody>
              </table>
              {/* <div className="float-end">
                <a href="javascript:window.print()" className="btn btn-success me-1"><i className="fa fa-print" /></a>
                <a href="#" className="btn btn-primary w-md">Send</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
