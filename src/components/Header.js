// src/components/Header.js
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

function Header() {
  return (
    <header>
      <Navbar expand="lg" bg="white" variant="light" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold d-flex align-items-center">
            <img
              src="./images/logo_isyara.svg"
              width="200"
              height="60"
              className="d-inline-block align-top me-2"
              alt="Isyara Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="isyara-navbar-nav" />
          <Navbar.Collapse id="isyara-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Fitur</Nav.Link>
              <Nav.Link href="#about">Tentang</Nav.Link>
              <Nav.Link href="#help">Bantuan</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
