import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const setTheme = (theme: string) => {
  document
    .documentElement
    .setAttribute('data-bs-theme', theme);
};

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">Mockoon Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Theme" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#" onClick={() => setTheme('light')}>Light</NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={() => setTheme('dark')}>Dark</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;