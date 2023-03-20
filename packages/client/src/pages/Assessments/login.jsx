import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/UserService';

export const Login = () => {
  const { formState: { errors }, handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();

  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    // check for a token or session ID in local storage
    const token = localStorage.getItem(`token`);
    if (token) {
      UserService.setAuthToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (data) => {
    const response = await UserService.login(data);
    if (response && response.message === `Login successful`) {
      localStorage.setItem(`token`, response.token);
      UserService.setAuthToken(response.token);
      setIsLoggedIn(true);
      navigate(`/`);
      reset();
    } else if (response && response.message === `Invalid username or password`) {
      setErrorMessage(`Invalid username or password`);
      reset();
    } else {
      console.log(`Unknown error occurred`);
    }
  };

  const handleLogout = () => {
    // clear the user's login state, e.g. by removing the token or session ID from cookies or local storage
    localStorage.removeItem(`token`);
    UserService.clearAuthToken();
    setIsLoggedIn(false);
  };

  const handleInputChange = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-200" style={{ maxWidth: `50000px` }}>
      <div className="card p-3">
        <h2 className="text-center mb-3">{`Login`}</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <Form onSubmit={isLoggedIn ? handleLogout : handleSubmit(handleLogin)}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register(`username`, { required: true })}
              onChange={handleInputChange}
              style={{ fontSize: `1.2rem` }}
            />
            {errors.username && <span className="text-danger">This field is required</span>}
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register(`password`, { required: true })}
              onChange={handleInputChange}
              style={{ fontSize: `1.2rem` }}
            />
            {errors.password && <span className="text-danger">This field is required</span>}
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            {`Login`}
          </Button>
        </Form>
      </div>
    </Container>

  );
};

export default Login;
