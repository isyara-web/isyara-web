'use client';

import React from 'react';
import { Container } from 'react-bootstrap';

/**
 * Reusable Section Component
 * @param {string} id - Section ID for anchor links
 * @param {string} bg - Background color class (bg-white, bg-light, etc)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Section content
 */
const Section = ({ 
  id, 
  bg = 'bg-white', 
  className = '', 
  children,
  padding = 'py-5',
  ...props 
}) => {
  return (
    <section 
      id={id} 
      className={`${padding} ${bg} ${className}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
};

Section.Container = ({ children, className = '', ...props }) => (
  <Container className={className} {...props}>
    {children}
  </Container>
);

export default Section;

