import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Footer from "../components/Footer.jsx";

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
// (Continue up to Circle20 as needed)

/* ========================
   4. Styled Components
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
const OpportunityTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;
const OpportunityRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
`;
const OpportunityLeft = styled.div`
  flex: 1;
`;
const OpportunityCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const OpportunityRight = styled.div`
  flex: 1;
  text-align: right;
  margin-top: -0.5rem;
`;
const OpportunityDetail = styled.p`
  margin: 0.3rem 0;
  line-height: 1.4;
  strong {
    font-weight: 600;
  }
`;

/* Progress Bar */
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
const OpportunityDescription = styled.div`
  width: 100%;
`;
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

/* Delete Opportunity Button */
const DeleteButton = styled.button`
  align-self: flex-end;
  padding: 0.6rem 1.2rem;
  background-color: #ef4444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: #dc2626;
  }
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

        // Fetch analytics data (if you have such an endpoint)
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

  /* DELETE an Opportunity */
  const handleDeleteOpportunity = async (opportunityId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this opportunity? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/opportunities/host/delete/${opportunityId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to delete opportunity");
      }
      alert("Opportunity deleted successfully!");

      // Remove from local state
      setOpportunities((prev) => prev.filter((o) => o.id !== opportunityId));
    } catch (error) {
      console.error("Delete Opportunity Error:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackgroundShapesContainer>
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Circle4 />
        {/* Add more circles if needed */}
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

                {/* Delete Opportunity Button */}
                <DeleteButton onClick={() => handleDeleteOpportunity(opp.id)}>
                  Delete Opportunity
                </DeleteButton>
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
