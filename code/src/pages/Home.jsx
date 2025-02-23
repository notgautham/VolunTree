import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import ImageCarousel from "../components/ImageCarousel";

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

  /* Subdued pastel gradient background (similar to About) */
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
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

/* Rotating shape animation */
const spin = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
`;

/* Swirling shape animation */
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

const HomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
`;

/*
   BACKGROUND SHAPES CONTAINER
   We'll define 41 circles with floating/spin/swirl animations, 
   same as in About.jsx for consistency.
*/
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

/* Reuse the same shapes from About, or generate new ones. 
   For brevity, here's the full set of 41 shapes. */
const Circle1 = styled(Shape)`
  width: 160px; height: 160px; top: -40px; left: -60px; background: #fa92b2;
  animation: ${float} 7s ease-in-out infinite;
`;
const Circle2 = styled(Shape)`
  width: 100px; height: 100px; top: 30%; right: 5%; background: #9b82f3;
  animation: ${spin} 12s linear infinite;
`;
const Circle3 = styled(Shape)`
  width: 180px; height: 180px; top: 55%; left: 10%; background: #f9cf61;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle4 = styled(Shape)`
  width: 220px; height: 220px; top: 20%; left: 40%; background: #52c7ee;
  animation: ${swirl} 10s linear infinite;
`;
const Circle5 = styled(Shape)`
  width: 140px; height: 140px; top: 70%; right: 20%; background: #fc8366;
  animation: ${spin} 14s linear infinite;
`;
const Circle6 = styled(Shape)`
  width: 120px; height: 120px; top: 80%; left: 5%; background: #d389fc;
  animation: ${float} 9s ease-in-out infinite;
`;
const Circle7 = styled(Shape)`
  width: 100px; height: 100px; top: 10%; right: 25%; background: #8efcc1;
  animation: ${swirl} 6s linear infinite;
`;
const Circle8 = styled(Shape)`
  width: 150px; height: 150px; bottom: -50px; left: 20%; background: #8093fc;
  animation: ${spin} 15s linear infinite;
`;
const Circle9 = styled(Shape)`
  width: 200px; height: 200px; top: 40%; left: -60px; background: #ffb7df;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle10 = styled(Shape)`
  width: 100px; height: 100px; bottom: 0; right: 0; background: #fcaf3e;
  animation: ${swirl} 9s linear infinite;
`;
const Circle11 = styled(Shape)`
  width: 170px; height: 170px; top: 15%; right: 10%; background: #fcdf66;
  animation: ${float} 7.5s ease-in-out infinite;
`;
const Circle12 = styled(Shape)`
  width: 90px; height: 90px; bottom: 15%; left: 25%; background: #d3fc66;
  animation: ${spin} 15s linear infinite;
`;
const Circle13 = styled(Shape)`
  width: 130px; height: 130px; top: 75%; left: 65%; background: #66fc8f;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle14 = styled(Shape)`
  width: 190px; height: 190px; top: 85%; right: 0; background: #66fcf2;
  animation: ${swirl} 11s linear infinite;
`;
const Circle15 = styled(Shape)`
  width: 80px; height: 80px; top: 25%; right: 40%; background: #857df5;
  animation: ${spin} 9s linear infinite;
`;
const Circle16 = styled(Shape)`
  width: 110px; height: 110px; bottom: 25%; left: 45%; background: #f57d93;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle17 = styled(Shape)`
  width: 90px; height: 90px; top: 5%; left: 45%; background: #7df5aa;
  animation: ${swirl} 12s linear infinite;
`;
const Circle18 = styled(Shape)`
  width: 150px; height: 150px; bottom: 20%; right: 10%; background: #f5b27d;
  animation: ${spin} 12s linear infinite;
`;
const Circle19 = styled(Shape)`
  width: 100px; height: 100px; top: 60%; right: 40%; background: #7df5f5;
  animation: ${float} 8s ease-in-out infinite;
`;
const Circle20 = styled(Shape)`
  width: 220px; height: 220px; bottom: 10px; left: -80px; background: #66ecfc;
  animation: ${swirl} 14s linear infinite;
`;
const Circle21 = styled(Shape)`
  width: 100px; height: 100px; top: 35%; left: 30%; background: #fa92b2;
  animation: ${spin} 16s linear infinite;
`;
const Circle22 = styled(Shape)`
  width: 110px; height: 110px; top: 75%; right: 15%; background: #fcaf3e;
  animation: ${float} 7s ease-in-out infinite;
`;
const Circle23 = styled(Shape)`
  width: 120px; height: 120px; top: 2%; right: 2%; background: #fa92b2;
  animation: ${spin} 14s linear infinite;
`;
const Circle24 = styled(Shape)`
  width: 140px; height: 140px; bottom: 30%; left: 3%; background: #52c7ee;
  animation: ${swirl} 9s linear infinite;
`;
const Circle25 = styled(Shape)`
  width: 80px; height: 80px; top: 28%; left: 50%; background: #d389fc;
  animation: ${float} 6.5s ease-in-out infinite;
`;
const Circle26 = styled(Shape)`
  width: 200px; height: 200px; top: 50%; left: 80%; background: #8efcc1;
  animation: ${swirl} 10s linear infinite;
`;
const Circle27 = styled(Shape)`
  width: 180px; height: 180px; bottom: 0; right: 45%; background: #8093fc;
  animation: ${spin} 15s linear infinite;
`;
const Circle28 = styled(Shape)`
  width: 90px; height: 90px; bottom: 10%; left: 35%; background: #66ecfc;
  animation: ${float} 9s ease-in-out infinite;
`;
const Circle29 = styled(Shape)`
  width: 130px; height: 130px; top: 15%; left: 20%; background: #fc8366;
  animation: ${spin} 13s linear infinite;
`;
const Circle30 = styled(Shape)`
  width: 150px; height: 150px; top: 45%; right: 30%; background: #f9cf61;
  animation: ${float} 8.5s ease-in-out infinite;
`;
const Circle31 = styled(Shape)`
  width: 200px; height: 200px; bottom: 35%; left: 0; background: #ffb7df;
  animation: ${swirl} 12s linear infinite;
`;
const Circle32 = styled(Shape)`
  width: 100px; height: 100px; top: 85%; right: 25%; background: #8efcc1;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle33 = styled(Shape)`
  width: 140px; height: 140px; top: 15%; left: 55%; background: #7df5f5;
  animation: ${spin} 16s linear infinite;
`;
const Circle34 = styled(Shape)`
  width: 90px; height: 90px; top: 35%; right: 15%; background: #66fc8f;
  animation: ${swirl} 14s linear infinite;
`;
const Circle35 = styled(Shape)`
  width: 110px; height: 110px; bottom: 45%; right: 25%; background: #fcdf66;
  animation: ${float} 7.5s ease-in-out infinite;
`;
const Circle36 = styled(Shape)`
  width: 220px; height: 220px; top: 0; right: 30%; background: #f57d93;
  animation: ${spin} 15s linear infinite;
`;
const Circle37 = styled(Shape)`
  width: 160px; height: 160px; bottom: 5%; left: 60%; background: #66ecfc;
  animation: ${swirl} 9s linear infinite;
`;
const Circle38 = styled(Shape)`
  width: 120px; height: 120px; top: 55%; right: 10%; background: #fa92b2;
  animation: ${float} 7s ease-in-out infinite;
`;
const Circle39 = styled(Shape)`
  width: 210px; height: 210px; bottom: 15%; left: 10%; background: #9b82f3;
  animation: ${spin} 11s linear infinite;
`;
const Circle40 = styled(Shape)`
  width: 100px; height: 100px; top: 70%; right: 50%; background: #fcaf3e;
  animation: ${float} 10s ease-in-out infinite;
`;
const Circle41 = styled(Shape)`
  width: 140px; height: 140px; bottom: 0; right: 60%; background: #d389fc;
  animation: ${swirl} 13s linear infinite;
`;

/* 
   AnimatedSection 
   plus a "SectionBox" to give each block a 
   white background + heavier shadow, just like About.jsx 
*/

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

const Highlight = styled.span`
  color: #f9cf61;
  font-weight: 700;
`;

/* 
   Additional sub-styling for cards, quotes, etc.
   We'll re-use the existing styles but adapt them to 
   the new "box" approach.
*/

/* Card Grid */
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
  box-shadow: 0px 4px 12px rgba(46, 58, 89, 0.05);
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

const TestimonialQuote = styled.blockquote`
  font-size: 1rem;
  color: #5c6773;
  line-height: 1.6;
  margin-bottom: 1rem;
  position: relative;

  &:before {
    content: "“";
    font-size: 2rem;
    color: #f9cf61;
    position: absolute;
    top: -20px;
    left: -10px;
  }
  &:after {
    content: "”";
    font-size: 2rem;
    color: #f9cf61;
    position: absolute;
    bottom: -20px;
    right: -10px;
  }
`;

const TestimonialAuthor = styled.cite`
  font-style: normal;
  color: #2d3142;
  font-weight: 600;
`;

/* Buttons */
const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  background-color: #f9cf61;
  color: #2d3142;
  font-weight: 600;
  padding: 0.8rem 2rem;
  border-radius: 40px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(249, 207, 97, 0.15);
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #ffd45f;
    box-shadow: 0 6px 16px rgba(249, 207, 97, 0.3);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: #ffffff;
  color: #2d3142;
  font-weight: 600;
  padding: 0.8rem 2rem;
  border-radius: 40px;
  border: 2px solid #f9cf61;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(249, 207, 97, 0.05);
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #fdfdfd;
    box-shadow: 0 6px 16px rgba(249, 207, 97, 0.15);
  }
`;

/* ========================
   HOME COMPONENT
   ======================== */
export default function Home() {
  const [heroRef, heroVisible] = useScrollAnimation();
  const [carouselRef, carouselVisible] = useScrollAnimation();
  const [missionRef, missionVisible] = useScrollAnimation();
  const [initiativesRef, initiativesVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation();
  const [eventsRef, eventsVisible] = useScrollAnimation();
  const [partnershipsRef, partnershipsVisible] = useScrollAnimation();
  const [membershipRef, membershipVisible] = useScrollAnimation();
  const [virtualRef, virtualVisible] = useScrollAnimation();

  return (
    <>
      <GlobalStyle />

      <HomeContainer>
        {/* Background shapes (41 circles) */}
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

        {/* ========================
            HERO SECTION
        ======================== */}
        <AnimatedSection ref={heroRef} visible={heroVisible} isHero>
          <SectionBox>
            <SectionTitle>VolunTree Chennai</SectionTitle>
            <SectionSubtitle>
              Driving <Highlight>Positive Change</Highlight> in the Heart of Tamil Nadu
            </SectionSubtitle>
            <ButtonGroup>
              <PrimaryButton to="/signup">Join as Volunteer</PrimaryButton>
              <SecondaryButton to="/host-signup">Become a Host</SecondaryButton>
            </ButtonGroup>
          </SectionBox>
        </AnimatedSection>

        {/* ========================
            IMAGE CAROUSEL
        ======================== */}
        <AnimatedSection ref={carouselRef} visible={carouselVisible}>
          <SectionBox>
            <ImageCarousel />
          </SectionBox>
        </AnimatedSection>

        {/* ========================
            MISSION SECTION
        ======================== */}
        <AnimatedSection ref={missionRef} visible={missionVisible}>
          <SectionBox>
            <SectionTitle>Our Mission</SectionTitle>
            <SectionSubtitle>
              At <Highlight>VolunTree Chennai</Highlight>, our goal is to foster
              a culture of volunteering that resonates through every street,
              beach, and neighborhood of this vibrant city. Join us to make
              Chennai a cleaner, greener, and more compassionate place to live.
            </SectionSubtitle>
            <SectionSubtitle>
              From <strong>urban tree-planting</strong> initiatives to{" "}
              <strong>health camps</strong> in underprivileged areas, every
              project is designed to make a real impact. Together, we can
              empower communities, uplift lives, and conserve our shared
              environment.
            </SectionSubtitle>
          </SectionBox>
        </AnimatedSection>

        {/* ========================
            KEY INITIATIVES
        ======================== */}
        <AnimatedSection ref={initiativesRef} visible={initiativesVisible}>
          <SectionBox>
            <SectionTitle>Key Initiatives in Chennai</SectionTitle>
            <SectionSubtitle>
              A snapshot of our most impactful programs for local communities:
            </SectionSubtitle>
            <CardGrid>
              <Card>
                <CardIcon>🌱</CardIcon>
                <h3>Urban Afforestation</h3>
                <p>
                  Plant trees across public parks and road medians to combat
                  Chennai’s rising heat index.
                </p>
              </Card>
              <Card>
                <CardIcon>🏖</CardIcon>
                <h3>Coastal Cleanup</h3>
                <p>
                  Preserve Chennai’s beaches through regular cleanups and waste
                  management drives.
                </p>
              </Card>
              <Card>
                <CardIcon>📚</CardIcon>
                <h3>Slum Education Support</h3>
                <p>
                  Volunteer-led after-school programs that bolster literacy and
                  career mentorship.
                </p>
              </Card>
              <Card>
                <CardIcon>💉</CardIcon>
                <h3>Health Outreach Camps</h3>
                <p>
                  Partner with local hospitals to provide free check-ups in
                  underserved communities.
                </p>
              </Card>
            </CardGrid>
          </SectionBox>
        </AnimatedSection>

        {/* ========================
            STATISTICS
        ======================== */}
        <AnimatedSection ref={statsRef} visible={statsVisible}>
          <SectionBox>
            <SectionTitle>Our Impact in Numbers</SectionTitle>
            <CardGrid>
              <Card>
                <h3>
                  <Highlight>12K+</Highlight>
                </h3>
                <p>Volunteers Engaged</p>
              </Card>
              <Card>
                <h3>
                  <Highlight>1,000+</Highlight>
                </h3>
                <p>Community Events Completed</p>
              </Card>
              <Card>
                <h3>
                  <Highlight>45K</Highlight>
                </h3>
                <p>Trees Planted Across Chennai</p>
              </Card>
              <Card>
                <h3>
                  <Highlight>300+</Highlight>
                </h3>
                <p>Schools & NGOs Partnered</p>
              </Card>
            </CardGrid>
          </SectionBox>
        </AnimatedSection>

        {/* ========================
            TESTIMONIALS
        ======================== */}
        <AnimatedSection ref={testimonialsRef} visible={testimonialsVisible}>
          <SectionBox>
            <SectionTitle>What People Are Saying</SectionTitle>
            <CardGrid>
              <Card>
                <TestimonialQuote>
                  “VolunTree Chennai connected me with a meaningful role in an
                  educational initiative. Witnessing students improve academically
                  has been the highlight of my year.”
                </TestimonialQuote>
                <TestimonialAuthor>— Karthik, Volunteer</TestimonialAuthor>
              </Card>
              <Card>
                <TestimonialQuote>
                  “Their beach clean-up drives are well organized and truly make
                  a difference. I’m proud to say I’ve helped keep Marina Beach
                  beautiful.”
                </TestimonialQuote>
                <TestimonialAuthor>— Anitha, Local Resident</TestimonialAuthor>
              </Card>
              <Card>
                <TestimonialQuote>
                  “I appreciate how VolunTree fosters a sense of community while
                  tackling serious environmental and social issues in Chennai.”
                </TestimonialQuote>
                <TestimonialAuthor>— Vijay, Host Partner</TestimonialAuthor>
              </Card>
            </CardGrid>
          </SectionBox>
        </AnimatedSection>

        {/* ========================
            UPCOMING EVENTS
        ======================== */}
        <AnimatedSection ref={eventsRef} visible={eventsVisible}>
          <SectionBox>
            <SectionTitle>Upcoming Events</SectionTitle>
            <SectionSubtitle>
              Sign up and help transform our city—one initiative at a time.
            </SectionSubtitle>
            <CardGrid>
              <Card>
                <h3>Beach Cleanup Marathon</h3>
                <p>
                  <strong>Date:</strong> March 25, 2025
                  <br />
                  <strong>Location:</strong> Marina Beach
                </p>
                <Link to="/events/beach-cleanup">Learn More</Link>
              </Card>
              <Card>
                <h3>Adyar River Restoration</h3>
                <p>
                  <strong>Date:</strong> April 10, 2025
                  <br />
                  <strong>Location:</strong> Adyar River Bank
                </p>
                <Link to="/events/river-cleanup">Learn More</Link>
              </Card>
              <Card>
                <h3>Blood Donation Drive</h3>
                <p>
                  <strong>Date:</strong> May 5, 2025
                  <br />
                  <strong>Location:</strong> Velachery Community Hall
                </p>
                <Link to="/events/blood-donation">Learn More</Link>
              </Card>
            </CardGrid>
          </SectionBox>
        </AnimatedSection>

        {/* ========================
            PARTNERSHIPS
        ======================== */}
        <AnimatedSection ref={partnershipsRef} visible={partnershipsVisible}>
          <SectionBox>
            <SectionTitle>Our Partnerships</SectionTitle>
            <SectionSubtitle>
              We believe in the power of collaboration. Our partners range from
              local NGOs, corporate sponsors, and public institutions to global
              organizations that recognize the unique spirit of Chennai.
            </SectionSubtitle>
            <CardGrid>
              <Card>
                <h3>City Municipal Corporation</h3>
                <p>
                  Working closely to facilitate licensing, permissions, and
                  official support for large-scale city projects.
                </p>
              </Card>
              <Card>
                <h3>Chennai Hospitals Network</h3>
                <p>
                  Delivering free medical camps and health check-ups in remote or
                  underserved neighborhoods.
                </p>
              </Card>
              <Card>
                <h3>Tech Companies</h3>
                <p>
                  Offering volunteer days, funding innovative solutions, and
                  digital platforms to streamline large events.
                </p>
              </Card>
            </CardGrid>
          </SectionBox>
        </AnimatedSection>

        {/* ========================
            MEMBERSHIP TIERS
        ======================== */}
        <AnimatedSection ref={membershipRef} visible={membershipVisible}>
          <SectionBox>
            <SectionTitle>Membership Tiers</SectionTitle>
            <SectionSubtitle>
              Want to give more? Become a sustaining member to unlock exclusive
              volunteer opportunities, leadership roles, and city-wide influence.
            </SectionSubtitle>
            <CardGrid>
              <Card>
                <h3>Basic Member</h3>
                <p>
                  Access to regular volunteer events, newsletter updates, and
                  one-off training sessions.
                </p>
              </Card>
              <Card>
                <h3>Silver Member</h3>
                <p>
                  Priority registration for large events, occasional invites to
                  special partner workshops, and volunteer leadership
                  opportunities.
                </p>
              </Card>
              <Card>
                <h3>Gold Member</h3>
                <p>
                  Early-bird access to events, in-depth project management roles,
                  exclusive networking opportunities, and a direct line to
                  organizational strategy sessions.
                </p>
              </Card>
            </CardGrid>
          </SectionBox>
        </AnimatedSection>

        {/* ========================
            VIRTUAL VOLUNTEERING
        ======================== */}
        <AnimatedSection ref={virtualRef} visible={virtualVisible}>
          <SectionBox>
            <SectionTitle>Virtual Volunteering</SectionTitle>
            <SectionSubtitle>
              Contribute to Chennai’s well-being from anywhere. Whether it’s
              online fundraising, mentoring via video calls, or helping us spread
              awareness, your digital contribution is crucial.
            </SectionSubtitle>
            <ButtonGroup>
              <PrimaryButton to="/virtual-volunteering">
                Explore Virtual Opportunities
              </PrimaryButton>
            </ButtonGroup>
          </SectionBox>
        </AnimatedSection>
      </HomeContainer>
    </>
  );
}
