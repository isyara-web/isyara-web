'use client';

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Section, Button } from '../components/ui';

function Hero() {
  const router = useRouter();

  return (
    <Section id="home" bg="bg-white" className="px-5">
      <Section.Container>
        <Row className="align-items-center px-5">
          <Col md={6}>
            <h1 className="fw-bold">Solusi Inklusif untuk <br /> Komunikasi Tunarungu</h1>
            <p className="mt-3">
              Isyara adalah aplikasi web inovatif yang menerjemahkan suara, video, dan teks secara otomatis ke dalam bahasa isyarat Indonesia (BISINDO), untuk mendukung aksesibilitas informasi bagi penyandang disabilitas pendengaran di Indonesia.
            </p>
            <Button variant="danger" onClick={() => router.push('/home')}>
              Mulai Sekarang
            </Button>          
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center p-4">
            <Image 
              src="/images/illustrasi_hero.svg" 
              alt="Hero" 
              width={600}
              height={400}
              className="img-fluid w-100"
              style={{ height: 'auto' }}
            />
          </Col>
        </Row>
      </Section.Container>
    </Section>
  );
}

export default Hero;
