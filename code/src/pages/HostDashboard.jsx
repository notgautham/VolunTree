import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Footer from "../components/Footer.jsx"; // Use your existing Footer component

/* ========================
   1. Global Style
   ======================== */
const GlobalStyle = createGlobalStyle`
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
   2. Animations
   ======================== */
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
   3. Background Shapes (Circles)
   ======================== */
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
const BgShape = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
`;
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

/* ========================
   4. Dashboard Styled Components
   ======================== */
const DashboardContainer = styled.div`
  padding: 2rem;
  margin-top: 8rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
`;
const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #1e40af;
  margin-bottom: 1rem;
`;
const OpportunityCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/* Title in bigger font */
const OpportunityTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

/* One row with 3 columns: left, center (progress bar), right */
const OpportunityRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
`;

/* Left Column */
const OpportunityLeft = styled.div`
  flex: 1;
`;

/* Center Column (progress bar) */
const OpportunityCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

/* Right Column */
const OpportunityRight = styled.div`
  flex: 1;
  text-align: right;
  margin-top: -0.5rem;
`;

/* For text details in each column */
const OpportunityDetail = styled.p`
  margin: 0.3rem 0;
  line-height: 1.4;
  strong {
    font-weight: 600;
  }
`;

/* Progress Bar Styles */
const ProgressContainer = styled.div`
  width: 95%;
  background: #e5e7eb;
  border-radius: 8px;
  height: 20px;
  position: relative;
  margin-top: 0.5rem;
`;
const ProgressFill = styled.div`
  background: #ef4444;
  height: 100%;
  border-radius: 8px;
  width: ${(props) => props.percentage}%;
  transition: width 0.3s ease;
`;
const ProgressLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-weight: bold;
  font-size: 0.85rem;
`;

/* Description is full width, below the row */
const OpportunityDescription = styled.div`
  width: 100%;
`;

/* Analytics */
const AnalyticsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;
const AnalyticsCard = styled.div`
  flex: 1;
  min-width: 200px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 1rem;
  text-align: center;
`;

/* ========================
   5. HostDashboard Component
   ======================== */
const HostDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalVolunteers: 0,
    totalHoursWorked: 0,
    totalEventsCompleted: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch host opportunities
        const oppResponse = await fetch(
          "http://localhost:5000/api/opportunities/host-opportunities",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const oppData = await oppResponse.json();
        setOpportunities(oppData);

        // Fetch analytics data
        const analyticsResponse = await fetch(
          "http://localhost:5000/api/analytics/host",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <GlobalStyle />
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

      <DashboardContainer>
        <h1>Host Dashboard</h1>
        <p>
          Welcome to the Host Dashboard. Here you can manage your volunteering
          opportunities and view useful analytics.
        </p>

        <SectionTitle>Your Opportunities</SectionTitle>
        {opportunities.length > 0 ? (
          opportunities.map((opp) => {
            const volunteerCount = opp.volunteer_count || 0;
            const volunteersRequired =
              opp.requirements?.volunteersRequired || 0;
            const progressPercentage =
              volunteersRequired > 0
                ? (volunteerCount / volunteersRequired) * 100
                : 0;

            return (
              <OpportunityCard key={opp.id}>
                <OpportunityTitle>{opp.title}</OpportunityTitle>
                <OpportunityRow>
                  <OpportunityLeft>
                    <OpportunityDetail>
                      <strong>Location:</strong> {opp.location}
                    </OpportunityDetail>
                    <OpportunityDetail>
                      <strong>Date:</strong>{" "}
                      {new Date(opp.date).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </OpportunityDetail>
                    {opp.requirements?.endDate && opp.requirements?.endTime && (
                      <OpportunityDetail>
                        <strong>Ends On:</strong>{" "}
                        {new Date(
                          `${opp.requirements.endDate}T${opp.requirements.endTime}`
                        ).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </OpportunityDetail>
                    )}
                  </OpportunityLeft>

                  <OpportunityCenter>
                    <ProgressContainer>
                      <ProgressFill percentage={progressPercentage} />
                      <ProgressLabel>
                        {volunteerCount}/{volunteersRequired}
                      </ProgressLabel>
                    </ProgressContainer>
                  </OpportunityCenter>

                  <OpportunityRight>
                    {opp.requirements && (
                      <>
                        <OpportunityDetail>
                          <strong>Max Age:</strong> {opp.requirements.maxAge}
                        </OpportunityDetail>
                        <OpportunityDetail>
                          <strong>Min Age:</strong> {opp.requirements.minAge}
                        </OpportunityDetail>
                        <OpportunityDetail>
                          <strong>Gender:</strong>{" "}
                          {opp.requirements.genderPreference ||
                            "No Preference"}
                        </OpportunityDetail>
                        <OpportunityDetail>
                          <strong>Work Hours:</strong>{" "}
                          {opp.requirements.workHours} per day
                        </OpportunityDetail>
                      </>
                    )}
                  </OpportunityRight>
                </OpportunityRow>

                <OpportunityDescription>
                  <OpportunityDetail>
                    <strong>Description:</strong> {opp.description}
                  </OpportunityDetail>
                </OpportunityDescription>
              </OpportunityCard>
            );
          })
        ) : (
          <p>No opportunities created yet.</p>
        )}

        <SectionTitle>Analytics</SectionTitle>
        <AnalyticsContainer>
          <AnalyticsCard>
            <h3>Total Volunteers Employed</h3>
            <p>{analytics.totalVolunteers}</p>
          </AnalyticsCard>
          <AnalyticsCard>
            <h3>Total Hours Worked</h3>
            <p>{analytics.totalHoursWorked}</p>
          </AnalyticsCard>
          <AnalyticsCard>
            <h3>Total Events Completed</h3>
            <p>{analytics.totalEventsCompleted}</p>
          </AnalyticsCard>
        </AnalyticsContainer>
      </DashboardContainer>

    </>
  );
};

export default HostDashboard;
