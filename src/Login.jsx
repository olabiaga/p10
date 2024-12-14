import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.css";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import jwtDecode from 'jwt-decode'; // Fixed import (removed destructuring)

import { API_ENDPOINT } from './Api';

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Verify if User In-Session in LocalStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Ensure token exists before parsing
        if (token) {
          const decodedToken = jwtDecode(token); // Decode token to verify
          setUser(decodedToken);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem('token'); // Remove invalid token
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
        username,
        password,
      });

      localStorage.setItem('token', JSON.stringify(response.data.token)); // Save only the token
      setError('');
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Naga College Foundation, Inc.</Navbar.Brand>
        </Container>
      </Navbar>
      <br /><br /><br /><br /><br /><br />
      <Container>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <div className="login-form">
              <div className="container">
                <div className="login-logo">
                  {/* <img src={logo} width={'38%'} alt="Logo" /> */}
                </div>
                <center>
                  NCFi: A Proposed Enrollment Systems <br />
                  Using Serverless Computing
                </center>
                &nbsp;
                <div className="card">
                  <div className="card-body login-card-body">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <br />
                      <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <br />
                      <Form.Group controlId="formButton">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Button
                          variant="success"
                          className="btn btn-block btn-flat rounded-pill"
                          type="submit"
                        >
                          Login
                        </Button>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
