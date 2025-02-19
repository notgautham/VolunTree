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
const PageWrapper = styled.div` display: flex; flex-direction: column; min-height: 100vh; `;
const MainContent = styled.div` flex-grow: 1; display: flex; align-items: center; justify-content: center; padding-top: 2rem; `;
const SignupContainer = styled.div`
  width: 40%; min-width: 600px; max-width: 900px;
  margin: 6rem auto 0; padding: 4rem; background-color: #ffffff;
  border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); text-align: center;
  position: relative; z-index: 1; transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 3rem;
  &:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.15); }
`;
const ToggleContainer = styled.div`
  display: flex; width: 100%; max-width: 400px; margin: 0 auto 1.5rem;
  background-color: #f1f1f1; border-radius: 50px; position: relative; overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const ToggleIndicator = styled.div`
  position: absolute; top: 0;
  left: ${(props) => (props.active === "Volunteer" ? "0%" : "50%")};
  width: 50%; height: 100%; background-color: #f9cf61;
  border-radius: 50px; transition: left 0.3s ease; z-index: 0;
`;
const ToggleButton = styled.button`
  flex: 1; padding: 0.75rem 1rem; border: none; background: transparent;
  font-size: 1rem; font-weight: 600; cursor: pointer; z-index: 1;
  color: ${(props) => (props.$active ? "#2d3142" : "#777")};
`;
const Title = styled.h2` font-size: 1.8rem; color: #1e40af; margin-bottom: 1rem; `;
const Form = styled.form` display: flex; flex-direction: column; gap: 1rem; `;
const Input = styled.input`
  padding: 0.8rem; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem; width: 100%;
  transition: border-color 0.3s ease; &:focus { outline: none; border-color: #f9cf61; }
`;
const TextArea = styled.textarea`
  padding: 0.8rem; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem; width: 100%;
  resize: vertical; min-height: 100px; transition: border-color 0.3s ease; &:focus { outline: none; border-color: #f9cf61; }
`;
const Select = styled.select`
  padding: 0.8rem; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem; width: 100%;
  transition: border-color 0.3s ease; &:focus { outline: none; border-color: #f9cf61; }
`;
const Button = styled.button`
  padding: 0.8rem; border: none; border-radius: 5px; background-color: #1e40af;
  color: white; font-size: 1rem; cursor: pointer; transition: background 0.3s ease, box-shadow 0.3s ease;
  &:hover { background-color: #15317e; }
`;
const BackgroundShapesContainer = styled.div`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; overflow: hidden; z-index: 0;
`;
const Shape = styled.div` position: absolute; border-radius: 50%; opacity: 0.15; `;
const Circle1 = styled(Shape)`
  width: 160px; height: 160px; top: -40px; left: -60px; background: #fa92b2;
  animation: ${float} 7s ease-in-out infinite;
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

  const handleToggle = (type) => {
    setToggle(type);
    setFormData({ ...formData, userType: type.toLowerCase() });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      // Using a relative URL so the Vite proxy routes to the backend at localhost:5000
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
            {/* Additional circles can be added here */}
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
