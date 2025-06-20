// src/components/FAQ.js
import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

function FAQ() {
  return (
    <section className="py-5" id="help">
      <Container>
        <h3 className="fw-bold mb-4 text-center">Apakah Anda memiliki pertanyaan?</h3>
        <Accordion className="p-5">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Siapa yang Bisa Menggunakan?</Accordion.Header>
            <Accordion.Body>
              Siapa saja! Mulai dari teman dengar, teman tuli, hingga masyarakat umum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Bagaimana cara kerja?</Accordion.Header>
            <Accordion.Body>
              Masukkan teks, audio, atau video. Isyara akan menerjemahkannya ke BISINDO secara otomatis.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Apa saja input yang bisa diterjemahkan?</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Upload video dari perangkat</li>
                <li>Masukkan link YouTube</li>
                <li>Input suara langsung</li>
                <li>Ketik teks manual</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Apakah hanya mendukung Bahasa Indonesia?</Accordion.Header>
            <Accordion.Body>
              Ya, saat ini hanya Bahasa Indonesia.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </section>
  );
}

export default FAQ;
