'use client';

import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from './ui';

function Header() {
  const router = useRouter();

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#features', label: 'Fitur' },
    { href: '/#about', label: 'Tentang' },
    { href: '/#help', label: 'Bantuan' }
  ];

  return (
    <header>
      <Navbar expand="lg" bg="white" variant="light" className="shadow-sm fixed-top">
        <Container>
          <Navbar.Brand href="/#home" className="fw-bold d-flex align-items-center">
            <Image
              src="/images/logo_isyara.svg"
              width={200}
              height={60}
              className="d-inline-block align-top me-2"
              alt="Isyara Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="isyara-navbar-nav" />
          <Navbar.Collapse id="isyara-navbar-nav">
            <Nav className="ms-auto">
              {navLinks.map((link) => (
                <Nav.Link key={link.href} href={link.href}>
                  {link.label}
                </Nav.Link>
              ))}
            </Nav>
            <Button
              variant="outline-danger"
              onClick={() => router.push('/home')}
              className="ms-4"
              style={{ backgroundColor: 'white', borderColor: 'red', color: 'red' }}
            >
              Mulai Sekarang
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
