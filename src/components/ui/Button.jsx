'use client';

import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

/**
 * Reusable Button Component
 * @param {string} variant - Button variant (primary, danger, outline-danger, etc)
 * @param {string} size - Button size (sm, lg)
 * @param {boolean} isLoading - Loading state
 * @param {boolean} disabled - Disabled state
 * @param {function} onClick - Click handler
 * @param {string} href - Link href (if provided, renders as link)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Button content
 */
const Button = ({
  variant = 'primary',
  size,
  isLoading = false,
  disabled = false,
  onClick,
  href,
  className = '',
  children,
  type = 'button',
  style,
  ...props
}) => {
  const buttonContent = isLoading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Loading...
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <BootstrapButton
        as="a"
        href={href}
        variant={variant}
        size={size}
        className={className}
        style={style}
        {...props}
      >
        {buttonContent}
      </BootstrapButton>
    );
  }

  return (
    <BootstrapButton
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={className}
      type={type}
      style={style}
      {...props}
    >
      {buttonContent}
    </BootstrapButton>
  );
};

export default Button;

