'use client';

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { Section } from '../components/ui';
import { WHY_CHOOSE_REASONS } from '../constants';

function WhyChoose() {
  return (
    <Section id="about" bg="bg-white">
      <Section.Container>
        <Row className="align-items-center py-5">
          <Col md={6} className="text-center">
            <Image
              src="/images/Illustration_2.svg"
              alt="Why Choose"
              width={400}
              height={350}
              className="img-fluid"
              style={{ maxHeight: '350px', width: 'auto' }}
            />
          </Col>
          <Col md={6}>
            <h3 className="fw-bold mb-3">Kenapa Memilih Isyara?</h3>
            <p className="text-muted">
              Temukan berbagai fitur yang kami sediakan dengan pengalaman menyenangkan <br/> setiap fitur memiliki fungsi uniknya masing-masing.
            </p>
            <ul className="list-unstyled mt-4">
              {WHY_CHOOSE_REASONS.map((reason, index) => (
                <li key={index} className="d-flex align-items-start mb-2">
                  <span className="me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="green"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.485 1.929a1 1 0 0 1 1.415 1.415l-8.1 8.1a1 1 0 0 1-1.415 0l-4.1-4.1a1 1 0 0 1 1.415-1.415l3.393 3.393 7.392-7.393z" />
                    </svg>
                  </span>
                  <span className="text-muted small">{reason}</span>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Section.Container>
    </Section>
  );
}

export default WhyChoose;
