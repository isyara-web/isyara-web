// src/components/About.js
import React from 'react';
import { Container } from 'react-bootstrap';

function About() {
  return (
    <section className="bg-light py-5">
      <Container className="px-5 py-4">
        <h3 className="fw-bold mb-3">Apa itu Isyara?</h3>
        <p>
          Isyara adalah sistem penerjemah multimodal berbasis web yang dirancang untuk meningkatkan aksesibilitas bagi penyandang disabilitas pendengaran. Dengan teknologi Natural Language Processing (NLP) dan Machine Learning, Isyara mampu menerjemahkan input suara, teks, maupun video ke dalam bahasa isyarat Indonesia (BISINDO).
        </p>
        <p>
          Dikembangkan sebagai solusi inklusif, Isyara tidak hanya membantu komunitas Tuli memahami informasi verbal, tetapi juga mendukung siapa pun yang ingin belajar bahasa isyarat secara praktis dan interaktif.        </p>
      </Container>
    </section>
  );
}

export default About;
