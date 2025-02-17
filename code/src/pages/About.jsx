import React, { useRef, useState, useEffect } from "react";
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

    if (currentRef) {
      observer.observe(currentRef);
    }
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

/* Fade sections up on scroll */
const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* Floating shapes animation */
const float = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

/* Rotating shape animation */
const spin = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
`;

/* A swirling variation for variety */
const swirl = keyframes`
  0% {
    transform: rotate(0deg) translate(0px, 0px);
  }
  25% {
    transform: rotate(90deg) translate(10px, -10px);
  }
  50% {
    transform: rotate(180deg) translate(-10px, 10px);
  }
  75% {
    transform: rotate(270deg) translate(10px, -10px);
  }
  100% {
    transform: rotate(360deg) translate(0px, 0px);
  }
`;

/* ========================
   4. Styled Components
   ======================== */

const AboutContainer = styled.div`
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

/* 
   We'll define 41 shapes in total, 
   each with different size, color, position, and animation
*/

/* Existing 21 shapes from previous code */
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
const Circle7 = styled(Shape)`
  width: 100px;
  height: 100px;
  top: 10%;
  right: 25%;
  background: #8efcc1;
  animation: ${swirl} 6s linear infinite;
`;
const Circle8 = styled(Shape)`
  width: 150px;
  height: 150px;
  bottom: -50px;
  left: 20%;
  background: #8093fc;
  animation: ${spin} 15s linear infinite;
`;
const Circle9 = styled(Shape)`
  width: 200px;
  height: 200px;
  top: 40%;
  left: -60px;
  background: #ffb7df;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle10 = styled(Shape)`
  width: 100px;
  height: 100px;
  bottom: 0;
  right: 0;
  background: #fcaf3e;
  animation: ${swirl} 9s linear infinite;
`;
const Circle11 = styled(Shape)`
  width: 170px;
  height: 170px;
  top: 15%;
  right: 10%;
  background: #fcdf66;
  animation: ${float} 7.5s ease-in-out infinite;
`;
const Circle12 = styled(Shape)`
  width: 90px;
  height: 90px;
  bottom: 15%;
  left: 25%;
  background: #d3fc66;
  animation: ${spin} 15s linear infinite;
`;
const Circle13 = styled(Shape)`
  width: 130px;
  height: 130px;
  top: 75%;
  left: 65%;
  background: #66fc8f;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle14 = styled(Shape)`
  width: 190px;
  height: 190px;
  top: 85%;
  right: 0;
  background: #66fcf2;
  animation: ${swirl} 11s linear infinite;
`;
const Circle15 = styled(Shape)`
  width: 80px;
  height: 80px;
  top: 25%;
  right: 40%;
  background: #857df5;
  animation: ${spin} 9s linear infinite;
`;
const Circle16 = styled(Shape)`
  width: 110px;
  height: 110px;
  bottom: 25%;
  left: 45%;
  background: #f57d93;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle17 = styled(Shape)`
  width: 90px;
  height: 90px;
  top: 5%;
  left: 45%;
  background: #7df5aa;
  animation: ${swirl} 12s linear infinite;
`;
const Circle18 = styled(Shape)`
  width: 150px;
  height: 150px;
  bottom: 20%;
  right: 10%;
  background: #f5b27d;
  animation: ${spin} 12s linear infinite;
`;
const Circle19 = styled(Shape)`
  width: 100px;
  height: 100px;
  top: 60%;
  right: 40%;
  background: #7df5f5;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle20 = styled(Shape)`
  width: 220px;
  height: 220px;
  bottom: 10px;
  left: -80px;
  background: #66ecfc;
  animation: ${swirl} 14s linear infinite;
`;
const Circle21 = styled(Shape)`
  width: 100px;
  height: 100px;
  top: 35%;
  left: 30%;
  background: #fa92b2;
  animation: ${spin} 16s linear infinite;
`;

/* 
   New shapes (20 more), continuing with Circle22 to Circle41 
   You can tweak their positions, sizes, colors, and animations. 
*/
const Circle22 = styled(Shape)`
  width: 110px;
  height: 110px;
  top: 75%;
  right: 15%;
  background: #fcaf3e;
  animation: ${float} 7s ease-in-out infinite;
`;
const Circle23 = styled(Shape)`
  width: 120px;
  height: 120px;
  top: 2%;
  right: 2%;
  background: #fa92b2;
  animation: ${spin} 14s linear infinite;
`;
const Circle24 = styled(Shape)`
  width: 140px;
  height: 140px;
  bottom: 30%;
  left: 3%;
  background: #52c7ee;
  animation: ${swirl} 9s linear infinite;
`;
const Circle25 = styled(Shape)`
  width: 80px;
  height: 80px;
  top: 28%;
  left: 50%;
  background: #d389fc;
  animation: ${float} 6.5s ease-in-out infinite;
`;
const Circle26 = styled(Shape)`
  width: 200px;
  height: 200px;
  top: 50%;
  left: 80%;
  background: #8efcc1;
  animation: ${swirl} 10s linear infinite;
`;
const Circle27 = styled(Shape)`
  width: 180px;
  height: 180px;
  bottom: 0;
  right: 45%;
  background: #8093fc;
  animation: ${spin} 15s linear infinite;
`;
const Circle28 = styled(Shape)`
  width: 90px;
  height: 90px;
  bottom: 10%;
  left: 35%;
  background: #66ecfc;
  animation: ${float} 9s ease-in-out infinite;
`;
const Circle29 = styled(Shape)`
  width: 130px;
  height: 130px;
  top: 15%;
  left: 20%;
  background: #fc8366;
  animation: ${spin} 13s linear infinite;
`;
const Circle30 = styled(Shape)`
  width: 150px;
  height: 150px;
  top: 45%;
  right: 30%;
  background: #f9cf61;
  animation: ${float} 8.5s ease-in-out infinite;
`;
const Circle31 = styled(Shape)`
  width: 200px;
  height: 200px;
  bottom: 35%;
  left: 0;
  background: #ffb7df;
  animation: ${swirl} 12s linear infinite;
`;
const Circle32 = styled(Shape)`
  width: 100px;
  height: 100px;
  top: 85%;
  right: 25%;
  background: #8efcc1;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle33 = styled(Shape)`
  width: 140px;
  height: 140px;
  top: 15%;
  left: 55%;
  background: #7df5f5;
  animation: ${spin} 16s linear infinite;
`;
const Circle34 = styled(Shape)`
  width: 90px;
  height: 90px;
  top: 35%;
  right: 15%;
  background: #66fc8f;
  animation: ${swirl} 14s linear infinite;
`;
const Circle35 = styled(Shape)`
  width: 110px;
  height: 110px;
  bottom: 45%;
  right: 25%;
  background: #fcdf66;
  animation: ${float} 7.5s ease-in-out infinite;
`;
const Circle36 = styled(Shape)`
  width: 220px;
  height: 220px;
  top: 0;
  right: 30%;
  background: #f57d93;
  animation: ${spin} 15s linear infinite;
`;
const Circle37 = styled(Shape)`
  width: 160px;
  height: 160px;
  bottom: 5%;
  left: 60%;
  background: #66ecfc;
  animation: ${swirl} 9s linear infinite;
`;
const Circle38 = styled(Shape)`
  width: 120px;
  height: 120px;
  top: 55%;
  right: 10%;
  background: #fa92b2;
  animation: ${float} 7s ease-in-out infinite;
`;
const Circle39 = styled(Shape)`
  width: 210px;
  height: 210px;
  bottom: 15%;
  left: 10%;
  background: #9b82f3;
  animation: ${spin} 11s linear infinite;
`;
const Circle40 = styled(Shape)`
  width: 100px;
  height: 100px;
  top: 70%;
  right: 50%;
  background: #fcaf3e;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle41 = styled(Shape)`
  width: 140px;
  height: 140px;
  bottom: 0;
  right: 60%;
  background: #d389fc;
  animation: ${swirl} 13s linear infinite;
`;

const AnimatedSection = styled.section`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  animation: ${(props) => (props.visible ? fadeUp : "none")} 0.8s ease-out forwards;
  position: relative;
  z-index: 1;

  /* Increased top padding for the hero heading */
  /* Additional bottom padding for more spacing */
  padding: ${(props) => (props.isHero ? "8rem 2rem 4rem" : "4rem 2rem")};
`;

/*
   Light "box" styling 
   with a stronger shadow 
   and more contrast 
*/
const SectionBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 3rem 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); /* heavier shadow */
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

/* Timeline Styles */
const TimelineContainer = styled.div`
  position: relative;
  margin-top: 2rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    background-color: #dcdcdc;
    transform: translateX(-50%);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  width: 50%;
  padding: 2rem 2rem 2rem 4rem;
  box-sizing: border-box;

  &:nth-child(odd) {
    left: 0;
    text-align: right;
    padding: 2rem 4rem 2rem 2rem;
  }
  &:nth-child(even) {
    left: 50%;
  }

  &:after {
    content: "";
    position: absolute;
    top: 40px;
    left: -30px;
    width: 16px;
    height: 16px;
    background-color: #f9cf61;
    border-radius: 50%;
    box-shadow: 0 0 0 3px #fff;
  }
  &:nth-child(odd)::after {
    left: auto;
    right: -30px;
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    padding: 2rem;
    text-align: left;

    &:after {
      left: 50%;
      transform: translateX(-50%);
      right: auto;
    }
  }
`;

const TimelineHeading = styled.h3`
  color: #2d3142;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

const TimelineText = styled.p`
  color: #4a4a4a;
  line-height: 1.6;
`;

const TimelineImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(46, 58, 89, 0.1);
`;

/* Card Grid & Team Cards */
const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const Card = styled.div`
  flex: 1 1 250px;
  max-width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(46, 58, 89, 0.06);
  padding: 2rem;
  text-align: center;
  margin: 0 auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(46, 58, 89, 0.12);
  }
`;

const TeamImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  background: #ddd;
`;

/*
   5. AboutUs Component
*/
export default function AboutUs() {
  // Intersection Observers for each section
  const [heroRef, heroVisible] = useScrollAnimation();
  const [storyRef, storyVisible] = useScrollAnimation();
  const [timelineRef, timelineVisible] = useScrollAnimation();
  const [visionRef, visionVisible] = useScrollAnimation();
  const [impactRef, impactVisible] = useScrollAnimation();
  const [futureRef, futureVisible] = useScrollAnimation();
  const [teamRef, teamVisible] = useScrollAnimation();

  return (
    <>
      <GlobalStyle />

      <AboutContainer>
        {/* ============== Background Shapes ============== */}
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
          {/* 41 shapes total */}
        </BackgroundShapesContainer>

        {/* ============== HERO SECTION ============== */}
        <AnimatedSection ref={heroRef} visible={heroVisible} isHero>
          <SectionBox>
            <SectionTitle>About VolunTree Chennai</SectionTitle>
            <SectionSubtitle>
              Learn about our history, our mission, and the passionate team
              driving each initiative to uplift communities across Chennai.
            </SectionSubtitle>
          </SectionBox>
        </AnimatedSection>

        {/* ============== OUR STORY ============== */}
        <AnimatedSection ref={storyRef} visible={storyVisible}>
          <SectionBox>
            <SectionTitle>Our Story</SectionTitle>
            <SectionSubtitle>
              VolunTree Chennai began as a humble movement in 2018 when a group
              of friends united to clean up a local park. Today, we’ve grown into
              a dynamic network of <strong>5,000+</strong> volunteers, educators, 
              health professionals, and change-makers, all dedicated to seeing 
              Chennai thrive.
            </SectionSubtitle>
            <SectionSubtitle>
              Over the years, we’ve tackled <strong>coastal cleanups</strong>,
              <strong> urban afforestation projects</strong>, and 
              <strong> health outreach camps</strong> to ensure sustainable 
              development and empowerment for every corner of the city. Whether 
              we’re planting trees or mentoring school children, our focus 
              remains clear: building a brighter, greener Chennai.
            </SectionSubtitle>
          </SectionBox>
        </AnimatedSection>

        {/* ============== TIMELINE ============== */}
        <AnimatedSection ref={timelineRef} visible={timelineVisible}>
          <SectionBox>
            <SectionTitle>Our Timeline</SectionTitle>
            <SectionSubtitle>
              A brief walkthrough of our major milestones and achievements.
            </SectionSubtitle>

            <TimelineContainer>
              <TimelineItem>
                <TimelineHeading>2018: The First Cleanup</TimelineHeading>
                <TimelineImage
                  src="https://picsum.photos/400/300?random=1"
                  alt="First Cleanup"
                />
                <TimelineText>
                  Our very first event at the Perungudi Lake area, where over
                  <strong> 50 volunteers</strong> joined hands to remove debris
                  and plastic waste, marking a successful start.
                </TimelineText>
              </TimelineItem>

              <TimelineItem>
                <TimelineHeading>2019: Growing Initiatives</TimelineHeading>
                <TimelineImage
                  src="https://picsum.photos/400/300?random=2"
                  alt="Growing Initiatives"
                />
                <TimelineText>
                  Launched an <strong>urban afforestation</strong> drive,
                  planting over 1,000 saplings. Formed partnerships with local
                  schools to introduce environmental workshops and skill-building
                  programs.
                </TimelineText>
              </TimelineItem>

              <TimelineItem>
                <TimelineHeading>2021: Health Outreach</TimelineHeading>
                <TimelineImage
                  src="https://picsum.photos/400/300?random=3"
                  alt="Health Camps"
                />
                <TimelineText>
                  Collaborated with major hospitals to run free{" "}
                  <strong>health camps</strong> in underserved parts of the city.
                  Reached out to thousands of citizens for basic medical services
                  and awareness sessions.
                </TimelineText>
              </TimelineItem>

              <TimelineItem>
                <TimelineHeading>2023: Going Virtual</TimelineHeading>
                <TimelineImage
                  src="https://picsum.photos/400/300?random=4"
                  alt="Virtual Volunteering"
                />
                <TimelineText>
                  Introduced <strong>virtual volunteering</strong> for mentoring,
                  fundraising, and awareness campaigns. Expanded our digital
                  presence, allowing more volunteers to join from anywhere.
                </TimelineText>
              </TimelineItem>
            </TimelineContainer>
          </SectionBox>
        </AnimatedSection>

        {/* ============== OUR VISION ============== */}
        <AnimatedSection ref={visionRef} visible={visionVisible}>
          <SectionBox>
            <SectionTitle>Our Vision</SectionTitle>
            <SectionSubtitle>
              At VolunTree Chennai, our vision is to cultivate an engaged,
              well-informed community that takes proactive steps toward
              environmental stewardship, educational excellence, and social
              well-being.
            </SectionSubtitle>
            <SectionSubtitle>
              We see a future where every citizen feels empowered to contribute
              to green initiatives, volunteer in their neighborhoods, and 
              support underprivileged groups through ongoing mentorship and 
              community-driven development.
            </SectionSubtitle>
          </SectionBox>
        </AnimatedSection>

        {/* ============== IMPACT HIGHLIGHTS ============== */}
        <AnimatedSection ref={impactRef} visible={impactVisible}>
          <SectionBox>
            <SectionTitle>Impact Highlights</SectionTitle>
            <SectionSubtitle>
              Here are just a few ways we’ve made a tangible difference:
            </SectionSubtitle>
            <SectionSubtitle>
              <strong>• 10,000+</strong> saplings planted in urban centers,
              <strong> 2,000+</strong> students mentored across 30 schools,
              <strong> 5 major </strong> city-wide health drives, and a growing 
              network of enthusiastic volunteers from all walks of life.
            </SectionSubtitle>
            <SectionSubtitle>
              From clearing plastic waste from beaches to hosting online 
              fundraisers that sustain local NGOs, our scope continues to expand. 
              Together, we’re tackling the biggest challenges Chennai faces.
            </SectionSubtitle>
          </SectionBox>
        </AnimatedSection>

        {/* ============== FUTURE PLANS ============== */}
        <AnimatedSection ref={futureRef} visible={futureVisible}>
          <SectionBox>
            <SectionTitle>Future Plans</SectionTitle>
            <SectionSubtitle>
              As we look ahead, our plans include extending our environmental
              programs to neighboring districts, building stronger partnerships
              with local government bodies, and deepening our commitment to
              youth empowerment and digital education.
            </SectionSubtitle>
            <SectionSubtitle>
              We also aim to integrate more <strong>tech-driven solutions</strong>
              to streamline volunteer sign-ups, track environmental data, and
              connect resources to the places that need them most. By constantly
              evolving our approach, we ensure that our work remains impactful
              and sustainable for generations to come.
            </SectionSubtitle>
          </SectionBox>
        </AnimatedSection>

        {/* ============== TEAM SECTION ============== */}
        <AnimatedSection ref={teamRef} visible={teamVisible}>
          <SectionBox>
            <SectionTitle>Meet Our Team</SectionTitle>
            <SectionSubtitle>
              A small but mighty group striving to make a lasting impact.
            </SectionSubtitle>
            <CardGrid>
              <Card>
                <TeamImage
                  src="https://picsum.photos/80/80?random=5"
                  alt="Team member"
                />
                <h3>Priya Raj</h3>
                <p>Founder & Director</p>
              </Card>
              <Card>
                <TeamImage
                  src="https://picsum.photos/80/80?random=6"
                  alt="Team member"
                />
                <h3>Arun Kumar</h3>
                <p>Operations Lead</p>
              </Card>
              <Card>
                <TeamImage
                  src="https://picsum.photos/80/80?random=7"
                  alt="Team member"
                />
                <h3>Anjali Nair</h3>
                <p>Community Engagement</p>
              </Card>
              <Card>
                <TeamImage
                  src="https://picsum.photos/80/80?random=8"
                  alt="Team member"
                />
                <h3>Devansh Gupta</h3>
                <p>Environmental Strategist</p>
              </Card>
            </CardGrid>
          </SectionBox>
        </AnimatedSection>
      </AboutContainer>
    </>
  );
}
