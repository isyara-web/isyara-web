// src/components/Features.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const features = [
  {
    title: "Upload Video dari Perangkat",
    description: "Unggah video berdurasi hingga 4 menit langsung dari perangkat Anda. Sistem akan mengekstrak audionya, mengubah menjadi teks, lalu menerjemahkannya ke dalam bahasa isyarat secara otomatis.",
    icon: "illustrasi_upload_video.svg"
  },
  {
    title: "Masukkan Link Video YouTube",
    description: "Masukkan tautan video YouTube berbahasa Indonesia. Isyara akan mengunduh dan memproses audio dari video tersebut, kemudian menerjemahkannya ke dalam gesture BISINDO yang sesuai.",
    icon: "illustrasi_link_youtube.svg"
  },
  {
    title: "Suara / Teks ke Bahasa Isyarat",
    description: "Masukkan suara atau teks, dan Isyara akan menerjemahkannya menjadi video gesture BISINDO satu kata satu video untuk memudahkan pemahaman.",
    icon: "illustrasi_text_to_gesture.svg"
  }
];

function Features() {
  return (
    <section className="py-5 bg-light" id="features">
      <Container className="py-5">
        <h2 className="text-center mb-2 fw-bold">Fitur Unggulan</h2>
        <p className="text-center text-muted mb-5">
          Dukung komunikasi inklusif dengan fitur terjemahan multimodal ke bahasa isyarat.
        </p>
        <Row className="justify-content-center g-4 px-4 mx-4">
          {features.map((f, idx) => (
            <Col key={idx} xs={12} md={6} lg={4} className="d-flex justify-content-center">
              <Card
                className="h-100 text-center border border-danger rounded-4 px-3 py-4"
                style={{ width: '100%', maxWidth: '320px', borderWidth: '1.5px' }}
              >
                <img
                  src={`./images/${f.icon}`}
                  alt={f.title}
                  className="mx-auto mb-4"
                  style={{ height: '180px' }}
                />
                <Card.Title className="fw-bold">{f.title}</Card.Title>
                <Card.Text className="text-muted small">{f.description}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Features;
