import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

/* ========================
   1. Global Style
   ======================== */
const GlobalStyle = createGlobalStyle`
  /* Basic reset with smooth transitions */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }
  html, body {
    width: 100%;
    min-height: 100%;
  }
  body {
    font-family: "Poppins", sans-serif;
    color: #2d3142;
    background: linear-gradient(135deg, #fff8e8 0%, #faecd3 100%);
    overflow-x: hidden;
  }
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
const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;
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

/* ========================
   4. Styled Components
   ======================== */

/* Layout Wrappers */
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
const Footer = styled.footer`
  background-color: #ffffff;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 0.9rem;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
`;

/* Background Animated Circles Container – fixed so they remain visible */
const BackgroundShapesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
`;

/* Base style for a background shape */
const BgShape = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
`;

/* 20 Animated Circles */
const Circle1 = styled(BgShape)`
  width: 160px; height: 160px; top: -40px; left: -60px;
  background: #fa92b2; animation: ${float} 7s ease-in-out infinite;
`;
const Circle2 = styled(BgShape)`
  width: 100px; height: 100px; top: 30%; right: 5%;
  background: #9b82f3; animation: ${spin} 12s linear infinite;
`;
const Circle3 = styled(BgShape)`
  width: 180px; height: 180px; top: 55%; left: 10%;
  background: #f9cf61; animation: ${float} 8s ease-in-out infinite;
`;
const Circle4 = styled(BgShape)`
  width: 220px; height: 220px; top: 20%; left: 40%;
  background: #52c7ee; animation: ${swirl} 10s linear infinite;
`;
const Circle5 = styled(BgShape)`
  width: 140px; height: 140px; top: 70%; right: 20%;
  background: #fc8366; animation: ${spin} 14s linear infinite;
`;
const Circle6 = styled(BgShape)`
  width: 120px; height: 120px; top: 80%; left: 5%;
  background: #d389fc; animation: ${float} 9s ease-in-out infinite;
`;
const Circle7 = styled(BgShape)`
  width: 100px; height: 100px; top: 10%; right: 25%;
  background: #8efcc1; animation: ${swirl} 6s linear infinite;
`;
const Circle8 = styled(BgShape)`
  width: 150px; height: 150px; bottom: -50px; left: 20%;
  background: #8093fc; animation: ${spin} 15s linear infinite;
`;
const Circle9 = styled(BgShape)`
  width: 200px; height: 200px; top: 40%; left: -60px;
  background: #ffb7df; animation: ${float} 8s ease-in-out infinite;
`;
const Circle10 = styled(BgShape)`
  width: 100px; height: 100px; bottom: 0; right: 0;
  background: #fcaf3e; animation: ${swirl} 9s linear infinite;
`;
const Circle11 = styled(BgShape)`
  width: 170px; height: 170px; top: 15%; right: 10%;
  background: #fcdf66; animation: ${float} 7.5s ease-in-out infinite;
`;
const Circle12 = styled(BgShape)`
  width: 90px; height: 90px; bottom: 15%; left: 25%;
  background: #d3fc66; animation: ${spin} 15s linear infinite;
`;
const Circle13 = styled(BgShape)`
  width: 130px; height: 130px; top: 75%; left: 65%;
  background: #66fc8f; animation: ${float} 10s ease-in-out infinite;
`;
const Circle14 = styled(BgShape)`
  width: 190px; height: 190px; top: 85%; right: 0;
  background: #66fcf2; animation: ${swirl} 11s linear infinite;
`;
const Circle15 = styled(BgShape)`
  width: 80px; height: 80px; top: 25%; right: 40%;
  background: #857df5; animation: ${spin} 9s linear infinite;
`;
const Circle16 = styled(BgShape)`
  width: 110px; height: 110px; bottom: 25%; left: 45%;
  background: #f57d93; animation: ${float} 8s ease-in-out infinite;
`;
const Circle17 = styled(BgShape)`
  width: 90px; height: 90px; top: 5%; left: 45%;
  background: #7df5aa; animation: ${swirl} 12s linear infinite;
`;
const Circle18 = styled(BgShape)`
  width: 150px; height: 150px; bottom: 20%; right: 10%;
  background: #f5b27d; animation: ${spin} 12s linear infinite;
`;
const Circle19 = styled(BgShape)`
  width: 100px; height: 100px; top: 60%; right: 40%;
  background: #7df5f5; animation: ${float} 8s ease-in-out infinite;
`;
const Circle20 = styled(BgShape)`
  width: 220px; height: 220px; bottom: 10px; left: -80px;
  background: #66ecfc; animation: ${swirl} 14s linear infinite;
`;

/* Opportunity Form Container */
const OpportunityContainer = styled.div`
  width: 50%;
  min-width: 700px;
  max-width: 1000px;
  margin: 8rem auto 0;
  padding: 4rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  text-align: center;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
  }
`;
const Title = styled.h2`
  font-size: 2rem;
  color: #1e40af;
  margin-bottom: 1rem;
`;
const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #4a4a4a;
  margin-bottom: 2rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  text-align: left;
`;
const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #2d3142;
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
  min-height: 150px;
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

/* ========================
   CREATE OPPORTUNITY COMPONENT
   ======================== */
export default function CreateOpportunity() {
  const [opportunity, setOpportunity] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    volunteersRequired: "",
    minAge: "",
    maxAge: "",
    genderPreference: "",
    workHours: "",
  });

  const handleChange = (e) => {
    setOpportunity({ ...opportunity, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Combine startDate and startTime into a single ISO datetime string
    const date = opportunity.startDate && opportunity.startTime 
      ? `${opportunity.startDate}T${opportunity.startTime}` 
      : "";
    
    // Pack additional details into a requirements object
    const requirements = {
      endDate: opportunity.endDate,
      endTime: opportunity.endTime,
      volunteersRequired: opportunity.volunteersRequired,
      minAge: opportunity.minAge,
      maxAge: opportunity.maxAge,
      genderPreference: opportunity.genderPreference,
      workHours: opportunity.workHours,
    };

    try {
      const response = await fetch("http://localhost:5000/api/opportunities/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: opportunity.title,
          description: opportunity.description,
          location: opportunity.location,
          date: date,
          requirements: requirements,
        }),
      });

      if (!response.ok) throw new Error("Failed to create opportunity");

      alert("Opportunity created successfully!");
      setOpportunity({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        volunteersRequired: "",
        minAge: "",
        maxAge: "",
        genderPreference: "",
        workHours: "",
      });
    } catch (error) {
      console.error(error.message);
      alert("An error occurred while creating the opportunity.");
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
          <OpportunityContainer>
            <Title>Create a Volunteering Opportunity</Title>
            <Subtitle>
              Fill in the details below to create a new volunteering opportunity.
            </Subtitle>
            <Form onSubmit={handleSubmit}>
              <Label>Title:</Label>
              <Input
                type="text"
                name="title"
                value={opportunity.title}
                onChange={handleChange}
                required
              />

              <Label>Description:</Label>
              <TextArea
                name="description"
                value={opportunity.description}
                onChange={handleChange}
                required
              />

              <Label>Location:</Label>
              <Input
                type="text"
                name="location"
                value={opportunity.location}
                onChange={handleChange}
                required
              />

              <Label>Start Date:</Label>
              <Input
                type="date"
                name="startDate"
                value={opportunity.startDate}
                onChange={handleChange}
                required
              />

              <Label>End Date:</Label>
              <Input
                type="date"
                name="endDate"
                value={opportunity.endDate}
                onChange={handleChange}
                required
              />

              <Label>Start Time:</Label>
              <Input
                type="time"
                name="startTime"
                value={opportunity.startTime}
                onChange={handleChange}
                required
              />

              <Label>End Time:</Label>
              <Input
                type="time"
                name="endTime"
                value={opportunity.endTime}
                onChange={handleChange}
                required
              />

              <Label>Volunteers Required:</Label>
              <Input
                type="number"
                name="volunteersRequired"
                value={opportunity.volunteersRequired}
                onChange={handleChange}
                required
              />

              <Label>Minimum Age:</Label>
              <Input
                type="number"
                name="minAge"
                value={opportunity.minAge}
                onChange={handleChange}
                required
              />

              <Label>Maximum Age:</Label>
              <Input
                type="number"
                name="maxAge"
                value={opportunity.maxAge}
                onChange={handleChange}
                required
              />

              <Label>Gender Preference:</Label>
              <Select
                name="genderPreference"
                value={opportunity.genderPreference}
                onChange={handleChange}
              >
                <option value="">No Preference</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>

              <Label>Work Hours (per day):</Label>
              <Input
                type="number"
                name="workHours"
                value={opportunity.workHours}
                onChange={handleChange}
                required
              />

              <Button type="submit">Create Opportunity</Button>
            </Form>
          </OpportunityContainer>
        </MainContent>
      </PageWrapper>
    </>
  );
}
