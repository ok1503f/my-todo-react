import { Container, Navbar, NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Nav({ name }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/logout", {
        withCredentials: true,
      });

      Swal.fire({
        title: "Success",
        text: "Logged out successfully",
        icon: "success",
        showCloseButton: true,
        timer: 2000,
      });
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error logging out:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to log out",
        icon: "error",
        showCloseButton: true,
      });
    }
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>to do list</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="text-white">Signed in as: </Navbar.Text>
          <NavDropdown
            className="text-white p-1"
            title={name.fullname}
            id="option-nav-dropdown"
          >
            <NavDropdown.Item className="text-dark" onClick={handleLogout}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Nav.propTypes = {
  name: PropTypes.object.isRequired,
};

export default Nav;
