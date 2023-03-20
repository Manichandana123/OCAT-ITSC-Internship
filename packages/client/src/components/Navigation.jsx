import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { Login } from '../pages/Assessments/login';

export const Navigation = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header>
      <Navbar expand="md" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">OCAT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/assessment">Dashboard</Nav.Link>
              <Nav.Link href="/assessment/new">New Assessment</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {isLoggedIn ?
                <Login handleLogout={handleLogout} /> :
                <Nav.Link href="/login">
                  <BsFillPersonFill /> Login
                </Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
