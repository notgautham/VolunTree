import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
/*import picture2 from "../assets/picture2.png";*/

const NavbarContainer = styled.nav`
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e40af;
  margin-right: 1rem;
  text-decoration: none;
`;

/* Container for the links; its layout is fixed */
const MainLinksContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  /* When authenticated, we want space between left (public links) and right (auth links);
     when not, we simply center the public links */
  justify-content: ${(props) => (props.authenticated ? "space-between" : "center")};
  margin-left: ${(props) => (props.authenticated ? "1rem" : "0")};
`;

const PublicLinks = styled.div`
  display: flex;
  gap: 1.1rem;
  align-items: center;
  /* If not authenticated, center these links */
  ${(props) =>
    !props.authenticated &&
    `
      margin: 0 auto;
    `}
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

const AuthLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
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

const LogoutButton = styled.button`
  padding: 0.6rem 1.4rem;
  border-radius: 25px;
  background-color: #e63946;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #c62828;
  }
`;

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  // Check auth state on mount and listen for auth changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedUserType = localStorage.getItem("userType");
      setIsAuthenticated(!!(token && storedUserType));
      setUserType(storedUserType);
    };

    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setIsAuthenticated(false);
    setUserType(null);
    navigate("/");
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <NavbarContainer>
      <img src={picture2} alt="Logo" style={{ height: "1.8rem", marginRight: "0.5rem" }} />
      <Logo to="/">VolunTree</Logo>
      <MainLinksContainer authenticated={isAuthenticated}>
        <PublicLinks authenticated={isAuthenticated}>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/initiatives">Initiatives</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/contact">Contact Us</Link>
        </PublicLinks>
        {isAuthenticated ? (
          <AuthLinks>
            {userType === "volunteer" ? (
              <>
                <Link to="/volunteer-dashboard">Dashboard</Link>
                <Link to="/volunteer-profile">Profile</Link>
                <Link to="/my-events">My Events</Link>
              </>
            ) : (
              <>
                <Link to="/host-dashboard">Dashboard</Link>
                <Link to="/host-profile">Profile</Link>
                <Link to="/create-opportunity">Create Opportunity</Link>
                <Link to="/manage-volunteers">Manage Volunteers</Link>
              </>
            )}
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </AuthLinks>
        ) : (
          <AuthButtons>
            <Link to="/login" className="login">Login</Link>
            <Link to="/signup" className="signup">Signup</Link>
          </AuthButtons>
        )}
      </MainLinksContainer>
    </NavbarContainer>
  );
};

export default Navbar;
