import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

/* ========================
   1. Global Style
   ======================== */
const GlobalStyle = createGlobalStyle`
  /* Basic reset */
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
  
  /* Subdued pastel gradient background */
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
  0%   { transform: rotate(0deg) translate(0px, 0px); }
  25%  { transform: rotate(90deg) translate(10px, -10px); }
  50%  { transform: rotate(180deg) translate(-10px, 10px); }
  75%  { transform: rotate(270deg) translate(10px, -10px); }
  100% { transform: rotate(360deg) translate(0px, 0px); }
`;

/* ========================
   4. Styled Components
   ======================== */

const ContactContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
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

const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
`;

/* Define 41 animated circles */
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
const Circle21 = styled(Shape)`width: 100px; height: 100px; top: 35%; left: 30%; background: #fa92b2; animation: ${spin} 16s linear infinite;`;
const Circle22 = styled(Shape)`width: 110px; height: 110px; top: 75%; right: 15%; background: #fcaf3e; animation: ${float} 7s ease-in-out infinite;`;
const Circle23 = styled(Shape)`width: 120px; height: 120px; top: 2%; right: 2%; background: #fa92b2; animation: ${spin} 14s linear infinite;`;
const Circle24 = styled(Shape)`width: 140px; height: 140px; bottom: 30%; left: 3%; background: #52c7ee; animation: ${swirl} 9s linear infinite;`;
const Circle25 = styled(Shape)`width: 80px; height: 80px; top: 28%; left: 50%; background: #d389fc; animation: ${float} 6.5s ease-in-out infinite;`;
const Circle26 = styled(Shape)`width: 200px; height: 200px; top: 50%; left: 80%; background: #8efcc1; animation: ${swirl} 10s linear infinite;`;
const Circle27 = styled(Shape)`width: 180px; height: 180px; bottom: 0; right: 45%; background: #8093fc; animation: ${spin} 15s linear infinite;`;
const Circle28 = styled(Shape)`width: 90px; height: 90px; bottom: 10%; left: 35%; background: #66ecfc; animation: ${float} 9s ease-in-out infinite;`;
const Circle29 = styled(Shape)`width: 130px; height: 130px; top: 15%; left: 20%; background: #fc8366; animation: ${spin} 13s linear infinite;`;
const Circle30 = styled(Shape)`width: 150px; height: 150px; top: 45%; right: 30%; background: #f9cf61; animation: ${float} 8.5s ease-in-out infinite;`;
const Circle31 = styled(Shape)`width: 200px; height: 200px; bottom: 35%; left: 0; background: #ffb7df; animation: ${swirl} 12s linear infinite;`;
const Circle32 = styled(Shape)`width: 100px; height: 100px; top: 85%; right: 25%; background: #8efcc1; animation: ${float} 10s ease-in-out infinite;`;
const Circle33 = styled(Shape)`width: 140px; height: 140px; top: 15%; left: 55%; background: #7df5f5; animation: ${spin} 16s linear infinite;`;
const Circle34 = styled(Shape)`width: 90px; height: 90px; top: 35%; right: 15%; background: #66fc8f; animation: ${swirl} 14s linear infinite;`;
const Circle35 = styled(Shape)`width: 110px; height: 110px; bottom: 45%; right: 25%; background: #fcdf66; animation: ${float} 7.5s ease-in-out infinite;`;
const Circle36 = styled(Shape)`width: 220px; height: 220px; top: 0; right: 30%; background: #f57d93; animation: ${spin} 15s linear infinite;`;
const Circle37 = styled(Shape)`width: 160px; height: 160px; bottom: 5%; left: 60%; background: #66ecfc; animation: ${swirl} 9s linear infinite;`;
const Circle38 = styled(Shape)`width: 120px; height: 120px; top: 55%; right: 10%; background: #fa92b2; animation: ${float} 7s ease-in-out infinite;`;
const Circle39 = styled(Shape)`width: 210px; height: 210px; bottom: 15%; left: 10%; background: #9b82f3; animation: ${spin} 11s linear infinite;`;
const Circle40 = styled(Shape)`width: 100px; height: 100px; top: 70%; right: 50%; background: #fcaf3e; animation: ${float} 10s ease-in-out infinite;`;
const Circle41 = styled(Shape)`width: 140px; height: 140px; bottom: 0; right: 60%; background: #d389fc; animation: ${swirl} 13s linear infinite;`;

/* AnimatedSection & SectionBox for content blocks */
const AnimatedSection = styled.section`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  animation: ${(props) => (props.visible ? fadeUp : "none")} 0.8s ease-out forwards;
  position: relative;
  z-index: 1;
  padding: ${(props) => (props.isHero ? "8rem 2rem 4rem" : "4rem 2rem")};
`;

const SectionBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 3rem 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  text-align: center;
  color: #4a4a4a;
  max-width: 800px;
  margin: 0.5rem auto 2rem;
  line-height: 1.7;
`;

const Highlight = styled.span`
  color: #f9cf61;
  font-weight: 700;
`;

/* Card Grid for analytics and contact info */
const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const Card = styled.div`
  flex: 1 1 280px;
  max-width: 320px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(46, 58, 89, 0.05);
  padding: 2rem;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  margin: 0 auto;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(46, 58, 89, 0.12);
    transform: translateY(-3px);
  }
  
  h3 {
    margin: 1rem 0;
    font-weight: 600;
  }
  
  p {
    color: #5c6773;
    line-height: 1.4;
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2d3142;
`;

/* Contact Info Section styles */
const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const InfoCard = styled.div`
  flex: 1 1 280px;
  max-width: 320px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  text-align: center;
  
  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
    color: #2d3142;
  }
  
  p {
    font-size: 1rem;
    color: #5c6773;
  }
`;

/* Contact Form Styles */
const FormContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto 0;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #2d3142;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #f9cf61;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #f9cf61;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 40px;
  background-color: #f9cf61;
  color: #2d3142;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(249, 207, 97, 0.15);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #ffd45f;
    box-shadow: 0 6px 16px rgba(249, 207, 97, 0.3);
  }
`;

/* ========================
   CONTACT COMPONENT
   ======================== */
export default function Contact() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [infoRef, infoVisible] = useScrollAnimation();
  const [formRef, formVisible] = useScrollAnimation();
  
  return (
    <>
      <GlobalStyle />
      <ContactContainer>
        {/* Background Animated Shapes */}
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
          <Circle21 />
          <Circle22 />
          <Circle23 />
          <Circle24 />
          <Circle25 />
          <Circle26 />
          <Circle27 />
          <Circle28 />
          <Circle29 />
          <Circle30 />
          <Circle31 />
          <Circle32 />
          <Circle33 />
          <Circle34 />
          <Circle35 />
          <Circle36 />
          <Circle37 />
          <Circle38 />
          <Circle39 />
          <Circle40 />
          <Circle41 />
        </BackgroundShapesContainer>
        
        {/* HERO SECTION */}
        <AnimatedSection ref={heroRef} visible={heroVisible} isHero>
          <SectionBox>
            <SectionTitle>Contact Us</SectionTitle>
            <SectionSubtitle>
              Have questions or need assistance? We're here to help.
            </SectionSubtitle>
          </SectionBox>
        </AnimatedSection>
        
        {/* CONTACT INFORMATION SECTION */}
        <AnimatedSection ref={infoRef} visible={infoVisible}>
          <SectionBox>
            <SectionTitle>Get in Touch</SectionTitle>
            <SectionSubtitle>
              VolunTree Chennai is based in the heart of Chennai, India. Reach out to us using the details below:
            </SectionSubtitle>
            <CardGrid>
              <InfoCard>
                <h3>Address</h3>
                <p>
                  123 Marina Beach Road<br />
                  Besant Nagar, Chennai,<br />
                  Tamil Nadu, India
                </p>
              </InfoCard>
              <InfoCard>
                <h3>Phone</h3>
                <p>044-12345678</p>
              </InfoCard>
              <InfoCard>
                <h3>Email</h3>
                <p>info@voluntreechennai.org</p>
              </InfoCard>
              <InfoCard>
                <h3>Working Hours</h3>
                <p>Mon - Fri: 9am - 6pm</p>
              </InfoCard>
            </CardGrid>
          </SectionBox>
        </AnimatedSection>
        
        {/* CONTACT FORM SECTION */}
        <AnimatedSection ref={formRef} visible={formVisible}>
          <SectionBox>
            <SectionTitle>Send Us a Message</SectionTitle>
            <SectionSubtitle>
              Fill in the form below and we'll get back to you as soon as possible.
            </SectionSubtitle>
            <FormContainer>
              <Form>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your Email" required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" type="text" placeholder="Subject" required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="message">Message</Label>
                  <TextArea id="message" placeholder="Your Message" required />
                </FormGroup>
                <SubmitButton type="submit">Send Message</SubmitButton>
              </Form>
            </FormContainer>
          </SectionBox>
        </AnimatedSection>
      </ContactContainer>
    </>
  );
}
