import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

/* ========================
   1. Global Style
   ======================== */
const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; transition: all 0.3s ease; }
  html, body { width: 100%; min-height: 100%; }
  body { font-family: "Poppins", sans-serif; color: #2d3142; background: linear-gradient(135deg, #fff8e8 0%, #faecd3 100%); overflow-x: hidden; }
`;

/* ========================
   2. Scroll Animation Hook
   ======================== */
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);
  return [ref, isVisible];
};

/* ========================
   3. Animations
   ======================== */
const float = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

/* ========================
   4. Styled Components
   ======================== */
const PageWrapper = styled.div` 
  display: flex; 
  flex-direction: column; 
  min-height: 100vh; 
`;
const MainContent = styled.div` 
  flex-grow: 1; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  padding-top: 2rem; 
`;
const SignupContainer = styled.div`
  width: 40%; 
  min-width: 600px; 
  max-width: 900px;
  margin: 6rem auto 0; 
  padding: 4rem; 
  background-color: #ffffff;
  border-radius: 8px; 
  box-shadow: 0 8px 24px rgba(0,0,0,0.12); 
  text-align: center;
  position: relative; 
  z-index: 1; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 3rem;
  &:hover { 
    transform: translateY(-3px); 
    box-shadow: 0 10px 28px rgba(0,0,0,0.15); 
  }
`;
const ToggleContainer = styled.div`
  display: flex; 
  width: 100%; 
  max-width: 400px; 
  margin: 0 auto 1.5rem;
  background-color: #f1f1f1; 
  border-radius: 50px; 
  position: relative; 
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const ToggleIndicator = styled.div`
  position: absolute; 
  top: 0;
  left: ${(props) => (props.active === "Volunteer" ? "0%" : "50%")};
  width: 50%; 
  height: 100%; 
  background-color: #f9cf61;
  border-radius: 50px; 
  transition: left 0.3s ease; 
  z-index: 0;
`;
const ToggleButton = styled.button`
  flex: 1; 
  padding: 0.75rem 1rem; 
  border: none; 
  background: transparent;
  font-size: 1rem; 
  font-weight: 600; 
  cursor: pointer; 
  z-index: 1;
  color: ${(props) => (props.$active ? "#2d3142" : "#777")};
`;
const Title = styled.h2`
  font-size: 1.8rem; 
  color: #1e40af; 
  margin-bottom: 1rem;
`;
const Form = styled.form`
  display: flex; 
  flex-direction: column; 
  gap: 1rem;
`;
const Input = styled.input`
  padding: 0.8rem; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  font-size: 1rem; 
  width: 100%;
  transition: border-color 0.3s ease; 
  &:focus { 
    outline: none; 
    border-color: #f9cf61; 
  }
`;
const TextArea = styled.textarea`
  padding: 0.8rem; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  font-size: 1rem; 
  width: 100%;
  resize: vertical; 
  min-height: 100px; 
  transition: border-color 0.3s ease; 
  &:focus { 
    outline: none; 
    border-color: #f9cf61; 
  }
`;
const Select = styled.select`
  padding: 0.8rem; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  font-size: 1rem; 
  width: 100%;
  transition: border-color 0.3s ease; 
  &:focus { 
    outline: none; 
    border-color: #f9cf61; 
  }
`;
const Button = styled.button`
  padding: 0.8rem; 
  border: none; 
  border-radius: 5px; 
  background-color: #1e40af;
  color: white; 
  font-size: 1rem; 
  cursor: pointer; 
  transition: background 0.3s ease, box-shadow 0.3s ease;
  &:hover { 
    background-color: #15317e; 
  }
`;
const BackgroundShapesContainer = styled.div`
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%;
  pointer-events: none; 
  overflow: hidden; 
  z-index: 0;
`;

/* Background Circles */
const ShapeBackground = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
`;
const Circle1 = styled(ShapeBackground)`
  width: 160px; 
  height: 160px; 
  top: -40px; 
  left: -60px; 
  background: #fa92b2;
  animation: ${float} 7s ease-in-out infinite;
`;
const Circle2 = styled(ShapeBackground)`
  width: 100px; 
  height: 100px; 
  top: 30%; 
  right: 5%; 
  background: #9b82f3;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle3 = styled(ShapeBackground)`
  width: 180px; 
  height: 180px; 
  top: 55%; 
  left: 10%; 
  background: #f9cf61;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle4 = styled(ShapeBackground)`
  width: 220px; 
  height: 220px; 
  top: 20%; 
  left: 40%; 
  background: #52c7ee;
  animation: ${float} 9s ease-in-out infinite;
`;
const Circle5 = styled(ShapeBackground)`
  width: 140px; 
  height: 140px; 
  top: 70%; 
  right: 20%; 
  background: #fc8366;
  animation: ${float} 11s ease-in-out infinite;
`;
const Circle6 = styled(ShapeBackground)`
  width: 120px; 
  height: 120px; 
  top: 80%; 
  left: 5%; 
  background: #d389fc;
  animation: ${float} 7s ease-in-out infinite;
`;
const Circle7 = styled(ShapeBackground)`
  width: 100px; 
  height: 100px; 
  top: 10%; 
  right: 25%; 
  background: #8efcc1;
  animation: ${float} 12s ease-in-out infinite;
`;
const Circle8 = styled(ShapeBackground)`
  width: 150px; 
  height: 150px; 
  bottom: -50px; 
  left: 20%; 
  background: #8093fc;
  animation: ${float} 13s ease-in-out infinite;
`;
const Circle9 = styled(ShapeBackground)`
  width: 200px; 
  height: 200px; 
  top: 40%; 
  left: -60px; 
  background: #ffb7df;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle10 = styled(ShapeBackground)`
  width: 100px; 
  height: 100px; 
  bottom: 0; 
  right: 0; 
  background: #fcaf3e;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle11 = styled(ShapeBackground)`
  width: 170px; 
  height: 170px; 
  top: 15%; 
  right: 10%; 
  background: #fcdf66;
  animation: ${float} 9s ease-in-out infinite;
`;
const Circle12 = styled(ShapeBackground)`
  width: 90px; 
  height: 90px; 
  bottom: 15%; 
  left: 25%; 
  background: #d3fc66;
  animation: ${float} 11s ease-in-out infinite;
`;
const Circle13 = styled(ShapeBackground)`
  width: 130px; 
  height: 130px; 
  top: 75%; 
  left: 65%; 
  background: #66fc8f;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle14 = styled(ShapeBackground)`
  width: 190px; 
  height: 190px; 
  top: 85%; 
  right: 0; 
  background: #66fcf2;
  animation: ${float} 12s ease-in-out infinite;
`;
const Circle15 = styled(ShapeBackground)`
  width: 80px; 
  height: 80px; 
  top: 25%; 
  right: 40%; 
  background: #857df5;
  animation: ${float} 9s ease-in-out infinite;
`;
const Circle16 = styled(ShapeBackground)`
  width: 110px; 
  height: 110px; 
  bottom: 25%; 
  left: 45%; 
  background: #f57d93;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle17 = styled(ShapeBackground)`
  width: 90px; 
  height: 90px; 
  top: 5%; 
  left: 45%; 
  background: #7df5aa;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle18 = styled(ShapeBackground)`
  width: 150px; 
  height: 150px; 
  bottom: 20%; 
  right: 10%; 
  background: #f5b27d;
  animation: ${float} 11s ease-in-out infinite;
`;
const Circle19 = styled(ShapeBackground)`
  width: 100px; 
  height: 100px; 
  top: 60%; 
  right: 40%; 
  background: #7df5f5;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle20 = styled(ShapeBackground)`
  width: 220px; 
  height: 220px; 
  bottom: 10px; 
  left: -80px; 
  background: #66ecfc;
  animation: ${float} 12s ease-in-out infinite;
`;

export default function Signup() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState("Volunteer");
  const [signupRef, signupVisible] = useScrollAnimation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    age: "",
    gender: "",
    // Host-specific fields
    organizationName: "",
    contactPerson: "",
    websiteUrl: "",
    description: "",
    userType: "volunteer",
  });

  // State to store email existence info
  const [emailExists, setEmailExists] = useState({ exists: false, roles: [] });

  // Check email existence via the new API endpoint
  const checkEmailExistence = async (email) => {
    if (!email) {
      setEmailExists({ exists: false, roles: [] });
      return;
    }
    try {
      const response = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setEmailExists(data);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    checkEmailExistence(email);
  };

  const handleToggle = (type) => {
    setToggle(type);
    setFormData({ ...formData, userType: type.toLowerCase() });
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      handleEmailChange(e);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {};
    if (toggle === "Volunteer") {
      payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNumber,
        address: formData.address,
        age: formData.age,
        gender: formData.gender,
        userType: "volunteer",
      };
    } else {
      payload = {
        fullName: formData.organizationName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNumber,
        address: formData.address,
        websiteUrl: formData.websiteUrl,
        description: formData.description,
        userType: "host",
      };
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(`Signup failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <MainContent>
          <BackgroundShapesContainer>
            <Circle1 />
            <Circle2 />
            <Circle3 />
            <Circle4 />
            <Circle5 />
            <Circle6 />
            <Circle7 />
            <Circle8 />
            <Circle9 />
            <Circle10 />
            <Circle11 />
            <Circle12 />
            <Circle13 />
            <Circle14 />
            <Circle15 />
            <Circle16 />
            <Circle17 />
            <Circle18 />
            <Circle19 />
            <Circle20 />
          </BackgroundShapesContainer>

          <SignupContainer
            ref={signupRef}
            style={{
              opacity: signupVisible ? 1 : 0,
              transform: signupVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <ToggleContainer>
              <ToggleIndicator active={toggle} />
              <ToggleButton $active={toggle === "Volunteer"} onClick={() => handleToggle("Volunteer")}>
                Volunteer
              </ToggleButton>
              <ToggleButton $active={toggle === "Host"} onClick={() => handleToggle("Host")}>
                Host
              </ToggleButton>
            </ToggleContainer>

            <Title>{toggle} Sign Up</Title>
            <Form onSubmit={handleSubmit}>
              {toggle === "Volunteer" ? (
                <>
                  <Input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
                  <Input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
                  {emailExists.exists && emailExists.roles.includes(formData.userType) && (
                    <p style={{ color: "red", fontSize: "0.9rem" }}>
                      This email is already registered as a {formData.userType}. Try logging in.
                    </p>
                  )}
                  {emailExists.exists && !emailExists.roles.includes(formData.userType) && (
                    <p style={{ color: "green", fontSize: "0.9rem" }}>
                      This email is registered under another role. You can proceed with this signup.
                    </p>
                  )}
                  <Input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                  <Input type="tel" name="contactNumber" placeholder="Contact Number" required onChange={handleChange} />
                  <Input type="text" name="address" placeholder="Residential Address" required onChange={handleChange} />
                  <Input type="number" name="age" placeholder="Age" required onChange={handleChange} />
                  <Select name="gender" required onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </>
              ) : (
                <>
                  <Input type="text" name="organizationName" placeholder="Organization/Company Name" required onChange={handleChange} />
                  <Input type="text" name="contactPerson" placeholder="Contact Person Name" required onChange={handleChange} />
                  <Input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
                  {emailExists.exists && emailExists.roles.includes(formData.userType) && (
                    <p style={{ color: "red", fontSize: "0.9rem" }}>
                      This email is already registered as a {formData.userType}. Try logging in.
                    </p>
                  )}
                  {emailExists.exists && !emailExists.roles.includes(formData.userType) && (
                    <p style={{ color: "green", fontSize: "0.9rem" }}>
                      This email is registered under another role. You can proceed with this signup.
                    </p>
                  )}
                  <Input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                  <Input type="tel" name="contactNumber" placeholder="Contact Number" required onChange={handleChange} />
                  <Input type="text" name="address" placeholder="Organization Address" required onChange={handleChange} />
                  <Input type="url" name="websiteUrl" placeholder="Website URL (optional)" onChange={handleChange} />
                  <TextArea name="description" placeholder="Brief Description of Organization/Initiative" required onChange={handleChange} />
                </>
              )}
              <Button type="submit">Sign Up</Button>
            </Form>
          </SignupContainer>
        </MainContent>
      </PageWrapper>
    </>
  );
}
