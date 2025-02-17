import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between; /* Place logo on left, others on right */
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;        /* Ensures the navbar spans the full width */
  right: 0;
  z-index: 1000;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box; /* Make sure sizing is correct */
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e40af;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  /* Remove flex-grow: 1 and justify-content: center */
  gap: 1.5rem;
  align-items: center;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
    font-size: 1rem;
    padding: 0.5rem 1rem;

    &:hover {
      color: #1e40af;
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  /* Remove margin-left: auto; to avoid pushing signup off screen */

  a {
    padding: 0.6rem 1.4rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
  }

  .login {
    background-color: #1e40af;
    color: white;

    &:hover {
      background-color: #15317e;
    }
  }

  .signup {
    border: 2px solid #1e40af;
    color: #1e40af;

    &:hover {
      background-color: #1e40af;
      color: white;
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo to="/">VolunTree</Logo>

      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/initiatives">Initiatives</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/contact">Contact Us</Link>
      </NavLinks>

      <AuthButtons>
        <Link to="/login" className="login">
          Login
        </Link>
        <Link to="/signup" className="signup">
          Signup
        </Link>
      </AuthButtons>
    </NavbarContainer>
  );
};

export default Navbar;
