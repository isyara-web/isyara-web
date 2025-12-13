'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card as BootstrapCard } from 'react-bootstrap';

/**
 * Reusable Service Card Component
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @param {string} href - Link href
 * @param {string} className - Additional CSS classes
 */
const ServiceCard = ({ title, description, href, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BootstrapCard
        className={`text-center ${className}`}
        style={{
          width: '220px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          color: '#333',
          transition: 'all 0.3s ease',
          boxShadow: isHovered ? '0 6px 16px rgba(0, 0, 0, 0.2)' : '0 2px 6px rgba(0,0,0,0.05)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <BootstrapCard.Title as="h3" style={{ marginBottom: '10px' }}>
          {title}
        </BootstrapCard.Title>
        <BootstrapCard.Text style={{ margin: 0 }}>{description}</BootstrapCard.Text>
      </BootstrapCard>
    </Link>
  );
};

export default ServiceCard;

