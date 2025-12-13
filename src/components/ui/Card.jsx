'use client';

import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

/**
 * Reusable Card Component
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Card content
 * @param {object} style - Inline styles
 */
const Card = ({ className = '', children, style, ...props }) => {
  return (
    <BootstrapCard className={className} style={style} {...props}>
      {children}
    </BootstrapCard>
  );
};

Card.Header = ({ children, className = '', ...props }) => (
  <BootstrapCard.Header className={className} {...props}>
    {children}
  </BootstrapCard.Header>
);

Card.Body = ({ children, className = '', ...props }) => (
  <BootstrapCard.Body className={className} {...props}>
    {children}
  </BootstrapCard.Body>
);

Card.Title = ({ children, className = '', ...props }) => (
  <BootstrapCard.Title className={className} {...props}>
    {children}
  </BootstrapCard.Title>
);

Card.Text = ({ children, className = '', ...props }) => (
  <BootstrapCard.Text className={className} {...props}>
    {children}
  </BootstrapCard.Text>
);

export default Card;

