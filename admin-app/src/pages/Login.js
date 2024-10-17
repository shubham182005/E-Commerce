import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Row, Col, message as antdMessage } from 'antd';

const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    dispatch(login({ email, password }));
   
  };
  if (isSuccess) {
    navigate('/verify-otp');
  } else if (isError) {
    antdMessage.error(message);
  }
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Title level={3} style={{ textAlign: 'center' }}>Admin Login</Title>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        {isError && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      </Col>
    </Row>
  );
};

export default Login;
