// src/components/CallToAction.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CallToAction() {
  const navigate = useNavigate();
  
  return (
    <section className="bg-white py-5 px-3">
      <div className="mx-auto" style={{ maxWidth: '960px' }}>
        <Container className="shadow-lg p-4 rounded">
          <Row className="align-items-center text-md-start text-center">
            <Col md={9}>
              <h4 className="fw-bold mb-2">Yuk Mulai Sekarang!</h4>
              <p className="mb-0">Ingin menerjemahkan teks, suara, atau video ke Bahasa Isyarat?</p>
            </Col>
            <Col md={3} className="text-md-end mt-3 mt-md-0">
              <Button variant="danger" onClick={() => navigate('/home')}>
                Mulai Sekarang
              </Button>            
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default CallToAction;
