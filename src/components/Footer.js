// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light py-4 mt-5">
      <Container>
        <div className="mx-auto" style={{ maxWidth: '1360px' }}>
          <Row className="align-items-center">
            <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
              <strong>© 2025 Isyara</strong>. All rights reserved.
            </Col>
            <Col md={6} className="text-md-end text-center">
              <a href="#home" className="me-3 text-decoration-none text-dark">Home</a>
              <a href="#features" className="me-3 text-decoration-none text-dark">Fitur</a>
              <a href="#about" className="me-3 text-decoration-none text-dark">Tentang</a>
              <a href="#help" className="text-decoration-none text-dark">Bantuan</a>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
