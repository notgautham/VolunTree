import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #fff8e8 0%, #faecd3 100%);
    color: #2d3142;
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
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
    </>
  );
};

export default VolunteerProfile;
