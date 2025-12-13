'use client';

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { Section, SectionHeader, Card } from '../components/ui';
import { FEATURES } from '../constants';

function Features() {
  return (
    <Section id="features" bg="bg-light">
      <Section.Container className="py-5">
        <SectionHeader
          title="Fitur Unggulan"
          subtitle="Dukung komunikasi inklusif dengan fitur terjemahan multimodal ke bahasa isyarat."
        />
        <Row className="justify-content-center g-4 px-4 mx-4">
          {FEATURES.map((feature, idx) => (
            <Col key={idx} xs={12} md={6} lg={4} className="d-flex justify-content-center">
              <Card
                className="h-100 text-center border border-danger rounded-4 px-3 py-4"
                style={{ width: '100%', maxWidth: '320px', borderWidth: '1.5px' }}
              >
                <Image
                  src={`/images/${feature.icon}`}
                  alt={feature.title}
                  width={200}
                  height={180}
                  className="mx-auto mb-4"
                  style={{ height: '180px', width: 'auto' }}
                />
                <Card.Title className="fw-bold">{feature.title}</Card.Title>
                <Card.Text className="text-muted small">{feature.description}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Section.Container>
    </Section>
  );
}

export default Features;
