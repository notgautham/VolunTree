import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #fff8e8 0%, #faecd3 100%);
    color: #2d3142;
    overflow-x: hidden;
  }
`;

// Background animation styles
const float = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const spin = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
`;

const swirl = keyframes`
  0% { transform: rotate(0deg) translate(0px, 0px); }
  25% { transform: rotate(90deg) translate(10px, -10px); }
  50% { transform: rotate(180deg) translate(-10px, 10px); }
  75% { transform: rotate(270deg) translate(10px, -10px); }
  100% { transform: rotate(360deg) translate(0px, 0px); }
`;

// Styling for main container
const Container = styled.div`
  min-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  z-index: 1;
  position: relative;
  transform: translateY(30px);
`;

// Centering the container on the page
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
`;

// Animated Background Circles
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

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
`;

const Circle1 = styled(Shape)`
  width: 160px;
  height: 160px;
  top: -40px;
  left: -60px;
  background: #fa92b2;
  animation: ${float} 7s ease-in-out infinite;
`;

const Circle2 = styled(Shape)`
  width: 100px;
  height: 100px;
  top: 30%;
  right: 5%;
  background: #9b82f3;
  animation: ${spin} 12s linear infinite;
`;

const Circle3 = styled(Shape)`
  width: 180px;
  height: 180px;
  top: 55%;
  left: 10%;
  background: #f9cf61;
  animation: ${float} 8s ease-in-out infinite;
`;

const Circle4 = styled(Shape)`
  width: 220px;
  height: 220px;
  top: 20%;
  left: 40%;
  background: #52c7ee;
  animation: ${swirl} 10s linear infinite;
`;

const Circle5 = styled(Shape)`
  width: 140px;
  height: 140px;
  top: 70%;
  right: 20%;
  background: #fc8366;
  animation: ${spin} 14s linear infinite;
`;

const Circle6 = styled(Shape)`
  width: 120px;
  height: 120px;
  top: 80%;
  left: 5%;
  background: #d389fc;
  animation: ${float} 9s ease-in-out infinite;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #1e40af;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  span {
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 5px;
  background-color: #1e40af;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #15317e;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: #2d3142;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #f9cf61;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #f9cf61;
  }
`;

const VolunteerProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    age: "",
    gender: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch volunteer profile data from /api/auth/volunteer/profile
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/auth/volunteer/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        // Map DB fields to our state keys if necessary (e.g., full_name to fullName)
        setProfile({
          fullName: data.full_name || "",
          email: data.email || "",
          contactNumber: data.contact_number || "",
          address: data.address || "",
          age: data.age || "",
          gender: data.gender || "",
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/volunteer/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // Send only editable fields
        body: JSON.stringify({
          fullName: profile.fullName,
          contactNumber: profile.contactNumber,
          address: profile.address,
          age: profile.age,
          gender: profile.gender,
        }),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <BackgroundShapesContainer>
          <Circle1 />
          <Circle2 />
          <Circle3 />
          <Circle4 />
          <Circle5 />
          <Circle6 />
        </BackgroundShapesContainer>
        <Container>
          <Title>Volunteer Profile</Title>
          {isEditing ? (
            <Form onSubmit={handleSave}>
              <Label>
                Full Name:
                <Input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Email:
                <Input
                  type="email"
                  name="email"
                  value={profile.email}
                  readOnly
                />
              </Label>
              <Label>
                Contact Number:
                <Input
                  type="text"
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Address:
                <Input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Age:
                <Input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Gender:
                <Select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </Label>
              <ButtonGroup>
                <Button type="submit">Save Changes</Button>
                <Button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Form>
          ) : (
            <>
              <InfoItem>
                <span>Full Name:</span> {profile.fullName}
              </InfoItem>
              <InfoItem>
                <span>Email:</span> {profile.email}
              </InfoItem>
              <InfoItem>
                <span>Contact Number:</span> {profile.contactNumber}
              </InfoItem>
              <InfoItem>
                <span>Address:</span> {profile.address}
              </InfoItem>
              <InfoItem>
                <span>Age:</span> {profile.age}
              </InfoItem>
              <InfoItem>
                <span>Gender:</span> {profile.gender}
              </InfoItem>
              <ButtonGroup>
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </ButtonGroup>
            </>
          )}
        </Container>
      </PageWrapper>
    </>
  );
};

export default VolunteerProfile;
