// src/components/Hero.js
import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="py-5 px-5 bg-white" id="home">
      <Container>
        <Row className="align-items-center px-5">
          <Col md={6}>
            <h1 className="fw-bold">Solusi Inklusif untuk <br /> Komunikasi Tunarungu</h1>
            <p className="mt-3">
              Isyara adalah aplikasi web inovatif yang menerjemahkan suara, video, dan teks secara otomatis ke dalam bahasa isyarat Indonesia (BISINDO), untuk mendukung aksesibilitas informasi bagi penyandang disabilitas pendengaran di Indonesia.
            </p>
              <Button variant="danger" onClick={() => navigate('/home')}>
                Mulai Sekarang
              </Button>          
            </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center p-4">
            <img src="./images/illustrasi_hero.svg" alt="Hero" className="img-fluid w-100" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;
