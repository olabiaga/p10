import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  
import "bootstrap/dist/css/bootstrap.css";  
import Container from 'react-bootstrap/Container';  
import Navbar from 'react-bootstrap/Navbar';  
import Form from 'react-bootstrap/Form';  
import Row from 'react-bootstrap/Row';  
import Col from 'react-bootstrap/Col';  
import Button from 'react-bootstrap/Button';  
import { API_ENDPOINT } from './Api';  

function Login() {  
    const navigate = useNavigate();  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [error, setError] = useState('');  
    const [loggedInUser, setLoggedInUser] = useState(null);  

    useEffect(() => {  
        const token = localStorage.getItem('token');  
        if (token) {  
            const tokenData = JSON.parse(token);  
            setLoggedInUser(tokenData.user);  
            navigate("/dashboard");  
        }  
    }, [navigate]);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        try {  
            const response = await axios.post(`${API_ENDPOINT}/auth/login`, {  
                username,  
                password,  
            });  

            if (response.data.token) {  
                localStorage.setItem("token", JSON.stringify({  
                    jwt: response.data.token,  
                    user: username,  
                }));  
                setError('');  
                navigate("/dashboard");  
            } else {  
                setError('Login failed. Please check your credentials.');  
            }  
        } catch (err) {  
            setError('Login failed. Please check your credentials.');  
            console.error('Login error:', err);  
        }  
    };  

    return (  
        <div style={{  
            backgroundImage: 'url(/bg.avif)',    
            backgroundSize: 'cover',  
            backgroundPosition: 'center',  
            height: '100vh',  
            display: 'flex',  
        }}>  
            <Container fluid>  
                <Row className="justify-content-end">  
                    <Col md={4} lg={3} className="p-3">  
                        <div className="card" style={{  
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',  
                            borderRadius: '10px',  
                            padding: '20px',  
                        }}>  
                            <h2 style={{  
                                textAlign: 'center',   
                                fontWeight: 'bold',  
                                marginBottom: '20px',  
                            }}>  
                                Log In  
                            </h2>  

                            <Form onSubmit={handleSubmit}>  
                                <Form.Group controlId="formUsername">  
                                    <Form.Label>Username:</Form.Label>  
                                    <Form.Control  
                                        type="text"  
                                        placeholder="Enter Username"  
                                        value={username}  
                                        onChange={(e) => setUsername(e.target.value)} required  
                                    />  
                                </Form.Group>  
                                <br />  

                                <Form.Group controlId="formPassword">  
                                    <Form.Label>Password:</Form.Label>  
                                    <Form.Control  
                                        type="password"  
                                        placeholder="Enter Password"  
                                        value={password}  
                                        onChange={(e) => setPassword(e.target.value)} required  
                                    />  
                                </Form.Group>  

                                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}  

                                <Button  
                                    variant='dark'  
                                    type="submit"  
                                    style={{ width: '100%', marginTop: '15px' }}  
                                >  
                                    Login  
                                </Button>  

                                <div style={{ textAlign: 'center', marginTop: '10px' }}>  
                                    <p>  
                                        Don't have an account?{' '}  
                                        <a href="/register" style={{ textDecoration: 'underline' }}>  
                                            Create an Account  
                                        </a>  
                                    </p>  
                                </div>  
                            </Form>  
                        </div>  
                    </Col>  
                </Row>  
            </Container>  
        </div>  
    );  
}  

export default Login;
