'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FooterLink } from './ui';

function Footer() {
  const footerLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#features', label: 'Fitur' },
    { href: '/#about', label: 'Tentang' },
    { href: '/#help', label: 'Bantuan' }
  ];

  return (
    <footer className="bg-light py-4 mt-5">
      <Container>
        <div className="mx-auto" style={{ maxWidth: '1360px' }}>
          <Row className="align-items-center">
            <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
              <strong>© 2025 Isyara</strong>. All rights reserved.
            </Col>
            <Col md={6} className="text-md-end text-center">
              {footerLinks.map((link, index) => (
                <FooterLink key={index} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
