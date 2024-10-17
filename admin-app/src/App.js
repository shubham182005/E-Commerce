import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import Addcoupon from "./pages/Addcoupon";
import ViewEnquiry from "./pages/ViewEnquiry";
import ViewOrders from "./pages/ViewOrder";
import NewList from "./pages/NewList";
import ScrollToTop from "./components/ScrollToTop";
import { PrivateRoutes } from "./routing/privateRoutes";
import { OpenRoutes } from "./routing/openRoutes";
import Invoice from "./pages/Invoice";
import OrderByDate from "./pages/OrderByDate";
import VerifyOtp from "./pages/VerifyOtp";
import Lead from "./pages/Lead";
import React, { useEffect } from 'react';
import SheetApi from "./pages/SheetApi";
import AddUser from "./pages/AddUser";
import AddAgent from "./pages/AddAgent";
import ViewAgent from "./pages/ViewAgent";
import Agent from "./pages/Agent";

function App() {
 
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoutes>
              {" "}
              <Login />{" "}
            </OpenRoutes>
          }
        />
        {/* <Route path="/verify-otp" element={<VerifyOtp />} /> */}
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnquiry />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category-list/:id" element={<Addblogcat />} />
          <Route path="coupon" element={<Addcoupon />} />
          <Route path="coupon/:id" element={<Addcoupon />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<ViewOrders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product/:id" element={<Addproduct />} />
          <Route path="new-list" element={<NewList />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="orderbydate" element={<OrderByDate />} />
          <Route path="lead" element={<Lead />} />
          <Route path="alllead" element={<SheetApi />} />
          <Route path="adduser" element={<AddUser/>}/>
          <Route path="agent" element={<Agent/>}/>
          <Route path="addagent" element={<AddAgent/>}/>
          <Route path="addagent/:id" element={<ViewAgent/>}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
