import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      if (currentRef) {
        observer.unobserve(currentRef);
      }
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
  0%   { transform: rotate(0deg) translate(0px, 0px); }
  25%  { transform: rotate(90deg) translate(10px, -10px); }
  50%  { transform: rotate(180deg) translate(-10px, 10px); }
  75%  { transform: rotate(270deg) translate(10px, -10px); }
  100% { transform: rotate(360deg) translate(0px, 0px); }
`;

/* ========================
   4. Styled Components
   ======================== */

/* Page Layout Wrappers */
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

/* Background Shapes Container (20 circles) */
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

/* 20 Animated Circles */
const Circle1 = styled(Shape)`width: 160px; height: 160px; top: -40px; left: -60px; background: #fa92b2; animation: ${float} 7s ease-in-out infinite;`;
const Circle2 = styled(Shape)`width: 100px; height: 100px; top: 30%; right: 5%; background: #9b82f3; animation: ${spin} 12s linear infinite;`;
const Circle3 = styled(Shape)`width: 180px; height: 180px; top: 55%; left: 10%; background: #f9cf61; animation: ${float} 8s ease-in-out infinite;`;
const Circle4 = styled(Shape)`width: 220px; height: 220px; top: 20%; left: 40%; background: #52c7ee; animation: ${swirl} 10s linear infinite;`;
const Circle5 = styled(Shape)`width: 140px; height: 140px; top: 70%; right: 20%; background: #fc8366; animation: ${spin} 14s linear infinite;`;
const Circle6 = styled(Shape)`width: 120px; height: 120px; top: 80%; left: 5%; background: #d389fc; animation: ${float} 9s ease-in-out infinite;`;
const Circle7 = styled(Shape)`width: 100px; height: 100px; top: 10%; right: 25%; background: #8efcc1; animation: ${swirl} 6s linear infinite;`;
const Circle8 = styled(Shape)`width: 150px; height: 150px; bottom: -50px; left: 20%; background: #8093fc; animation: ${spin} 15s linear infinite;`;
const Circle9 = styled(Shape)`width: 200px; height: 200px; top: 40%; left: -60px; background: #ffb7df; animation: ${float} 8s ease-in-out infinite;`;
const Circle10 = styled(Shape)`width: 100px; height: 100px; bottom: 0; right: 0; background: #fcaf3e; animation: ${swirl} 9s linear infinite;`;
const Circle11 = styled(Shape)`width: 170px; height: 170px; top: 15%; right: 10%; background: #fcdf66; animation: ${float} 7.5s ease-in-out infinite;`;
const Circle12 = styled(Shape)`width: 90px; height: 90px; bottom: 15%; left: 25%; background: #d3fc66; animation: ${spin} 15s linear infinite;`;
const Circle13 = styled(Shape)`width: 130px; height: 130px; top: 75%; left: 65%; background: #66fc8f; animation: ${float} 10s ease-in-out infinite;`;
const Circle14 = styled(Shape)`width: 190px; height: 190px; top: 85%; right: 0; background: #66fcf2; animation: ${swirl} 11s linear infinite;`;
const Circle15 = styled(Shape)`width: 80px; height: 80px; top: 25%; right: 40%; background: #857df5; animation: ${spin} 9s linear infinite;`;
const Circle16 = styled(Shape)`width: 110px; height: 110px; bottom: 25%; left: 45%; background: #f57d93; animation: ${float} 8s ease-in-out infinite;`;
const Circle17 = styled(Shape)`width: 90px; height: 90px; top: 5%; left: 45%; background: #7df5aa; animation: ${swirl} 12s linear infinite;`;
const Circle18 = styled(Shape)`width: 150px; height: 150px; bottom: 20%; right: 10%; background: #f5b27d; animation: ${spin} 12s linear infinite;`;
const Circle19 = styled(Shape)`width: 100px; height: 100px; top: 60%; right: 40%; background: #7df5f5; animation: ${float} 8s ease-in-out infinite;`;
const Circle20 = styled(Shape)`width: 220px; height: 220px; bottom: 10px; left: -80px; background: #66ecfc; animation: ${swirl} 14s linear infinite;`;

/* Toggle + Form Container */
const LoginContainer = styled.div`
  /* Use a percentage-based width so the form 
     occupies ~40% of the page, with a min-width for smaller screens */
  width: 40%;
  min-width: 600px;  /* ensure the form remains wide even on smaller displays */
  max-width: 800px;  /* optionally cap the maximum width */
  margin: 4rem auto 0;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  text-align: center;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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
  color: ${(props) => (props.active ? "#2d3142" : "#777")};
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

/* MAIN COMPONENT */
export default function Login() {
  const [toggle, setToggle] = useState("Volunteer");
  const [toggleRef, toggleVisible] = useScrollAnimation();
  const [formRef, formVisible] = useScrollAnimation();

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <MainContent>
          <BackgroundShapesContainer>
            {/* 20 animated circles */}
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

          <LoginContainer>
            <ToggleContainer ref={toggleRef}>
              <ToggleIndicator active={toggle} />
              <ToggleButton
                active={toggle === "Volunteer"}
                onClick={() => setToggle("Volunteer")}
              >
                Volunteer
              </ToggleButton>
              <ToggleButton
                active={toggle === "Host"}
                onClick={() => setToggle("Host")}
              >
                Host
              </ToggleButton>
            </ToggleContainer>

            <Title>{toggle} Login</Title>
            <Form ref={formRef}>
              <Input type="email" placeholder="Enter your email" required />
              <Input type="password" placeholder="Enter your password" required />
              <Button type="submit">Login</Button>
            </Form>
          </LoginContainer>
        </MainContent>
        {/* Independent Footer is rendered elsewhere */}
      </PageWrapper>
    </>
  );
}
