import React, { useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import "./Navbar.css";

function Navbar() {
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="#home">DogCheck</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dogs">Dogs</Nav.Link>
            <Nav.Link href="/appointments">Appointments</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
