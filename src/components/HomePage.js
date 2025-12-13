'use client';

import React from 'react';
import { PageContainer, PageTitle, PageSubtitle, ServiceCard, CardGrid, Button } from './ui';

const HomePage = () => {
  const services = [
    {
      title: 'Upload Video',
      description: 'Ubah video menjadi gerakan isyarat',
      href: '/upload-video'
    },
    {
      title: 'Text to Gesture',
      description: 'Konversi teks ke animasi isyarat',
      href: '/text-to-gesture'
    }
  ];

  return (
    <PageContainer>
      <PageTitle title="Selamat Datang di Isyara" highlightText="Isyara" />
      <PageSubtitle subtitle="Pilih layanan di bawah ini untuk mulai menerjemahkan ke Bahasa Isyarat" />

      <CardGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            href={service.href}
          />
        ))}
      </CardGrid>

      <div style={{ marginTop: '40px' }}>
        <Button variant="danger" href="/#home">
          Kembali ke Beranda
        </Button>
      </div>
    </PageContainer>
  );
};

export default HomePage;
