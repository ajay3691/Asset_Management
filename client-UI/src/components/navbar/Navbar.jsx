import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
//import './Navbar.css'; // Make sure the CSS file is correctly located

const NavbarComponent = ({ toggleSidebar }) => {
  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Asset Management</Navbar.Brand>
        <Button variant="outline-secondary" onClick={toggleSidebar} className="ms-auto">
          <i className="fas fa-bars"></i> {/* Menu icon */}
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
