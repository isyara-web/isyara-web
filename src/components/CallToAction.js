'use client';

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { Section, Button } from '../components/ui';

function CallToAction() {
  const router = useRouter();
  
  return (
    <Section bg="bg-white" className="px-3">
      <div className="mx-auto" style={{ maxWidth: '960px' }}>
        <Section.Container className="shadow-lg p-4 rounded">
          <Row className="align-items-center text-md-start text-center">
            <Col md={9}>
              <h4 className="fw-bold mb-2">Yuk Mulai Sekarang!</h4>
              <p className="mb-0">Ingin menerjemahkan teks, suara, atau video ke Bahasa Isyarat?</p>
            </Col>
            <Col md={3} className="text-md-end mt-3 mt-md-0">
              <Button variant="danger" onClick={() => router.push('/home')}>
                Mulai Sekarang
              </Button>            
            </Col>
          </Row>
        </Section.Container>
      </div>
    </Section>
  );
}

export default CallToAction;
