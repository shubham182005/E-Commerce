// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { verifyOTP } from '../features/auth/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { Form, Input, Button, Typography, Row, Col, message as antdMessage } from 'antd';

// const { Title } = Typography;

// const VerifyOTP = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, isError, isSuccess, message, user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (isSuccess) {
//       antdMessage.success(`Welcome, ${user.firstname} ${user.lastname}`);
//       navigate('/admin');
//     }

//     if (isError) {
//       antdMessage.error(message || "You are not an Admin");
//     }
//   }, [isSuccess, isError, message, user, navigate]);

//   const handleSubmit = () => {
//     dispatch(verifyOTP({ email, otp }));
//   };

//   return (
//     <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
//       <Col xs={22} sm={16} md={12} lg={8}>
//         <Title level={3} style={{ textAlign: 'center' }}>Verify OTP</Title>
//         <Form onFinish={handleSubmit} layout="vertical">
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
//           >
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={isLoading}
//             />
//           </Form.Item>
//           <Form.Item
//             label="OTP"
//             name="otp"
//             rules={[{ required: true, message: 'Please input the OTP!' }]}
//           >
//             <Input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               disabled={isLoading}
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block loading={isLoading}>
//               {isLoading ? 'Loading...' : 'Verify OTP'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Col>
//     </Row>
//   );
// };

// export default VerifyOTP;
import React from 'react'

const VerifyOtp = () => {
  return (
    <div>VerifyOtp</div>
  )
}

export default VerifyOtp

