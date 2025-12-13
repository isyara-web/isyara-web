'use client';

import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Section } from '../components/ui';
import { FAQ_ITEMS } from '../constants';

function FAQ() {
  return (
    <Section id="help" bg="bg-white">
      <Section.Container>
        <h3 className="fw-bold mb-4 text-center">Apakah Anda memiliki pertanyaan?</h3>
        <Accordion className="p-5">
          {FAQ_ITEMS.map((item, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Section.Container>
    </Section>
  );
}

export default FAQ;
