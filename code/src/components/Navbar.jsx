import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
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
  text-decoration: none;
`;

const MainLinksContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 2rem;
`;

const PublicLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
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

  // Check auth state on mount and when "authChange" is dispatched
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
    // Optionally, you could dispatch another event if needed:
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <NavbarContainer>
      <Logo to="/">VolunTree</Logo>
      <MainLinksContainer>
        {/* Left half: Public Links */}
        <PublicLinks>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/initiatives">Initiatives</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/contact">Contact Us</Link>
        </PublicLinks>

        {/* Right half: Authenticated Links or Login/Signup */}
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
