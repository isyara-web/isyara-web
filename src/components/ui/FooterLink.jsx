'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Reusable Footer Link Component
 * @param {string} href - Link href
 * @param {string} children - Link text
 * @param {string} className - Additional CSS classes
 */
const FooterLink = ({ href, children, className = '' }) => {
  return (
    <Link
      href={href}
      className={`me-3 text-decoration-none text-dark ${className}`}
    >
      {children}
    </Link>
  );
};

export default FooterLink;

