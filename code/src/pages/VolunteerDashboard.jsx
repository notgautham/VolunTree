import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Footer from "../components/Footer.jsx";

/* ========================
   Global Styles
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
   Dashboard Container
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

/* ========================
   Section Title
   ======================== */
const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #1e40af;
  margin-bottom: 1rem;
`;

/* ========================
   Opportunity Card
   ======================== */
const OpportunityCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
`;

/* Header & Title */
const OpportunityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const OpportunityTitle = styled.h3`
  font-size: 1.8rem;
  margin: 0;
`;

/* Basic info always shown */
const BasicInfo = styled.div`
  margin-top: 0.5rem;
`;

/* Expanded content when card is clicked */
const ExpandedContent = styled.div`
  margin-top: 1rem;
`;

/* Volunteer Button */
const VolunteerButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: #15317e;
  }
`;

/* ========================
   VolunteerDashboard Component
   ======================== */
const VolunteerDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [expandedOpportunityId, setExpandedOpportunityId] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/opportunities/volunteer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error("Error fetching volunteer opportunities:", error);
      }
    };

    fetchOpportunities();
  }, []);

  const toggleExpansion = (id) => {
    setExpandedOpportunityId(expandedOpportunityId === id ? null : id);
  };

  const handleVolunteerSignUp = async (oppId, e) => {
    e.stopPropagation(); // Prevent card toggle
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/opportunities/signup/${oppId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert("Successfully signed up for this opportunity!");
        // Optionally update the opportunity state here (e.g., mark as signed up)
      } else {
        const errData = await response.json();
        alert("Error: " + errData.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred while signing up.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <DashboardContainer>
        <h1>Volunteer Dashboard</h1>
        <SectionTitle>Available Opportunities</SectionTitle>
        {opportunities.length > 0 ? (
          opportunities.map((opp) => (
            <OpportunityCard key={opp.id} onClick={() => toggleExpansion(opp.id)}>
              <OpportunityHeader>
                <OpportunityTitle>{opp.title}</OpportunityTitle>
              </OpportunityHeader>
              <BasicInfo>
                <p>
                  <strong>Location:</strong> {opp.location}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(opp.date).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </BasicInfo>
              {expandedOpportunityId === opp.id && (
                <ExpandedContent>
                  <p>
                    <strong>Description:</strong> {opp.description}
                  </p>
                  {opp.requirements && (
                    <>
                      <p>
                        <strong>Requirements:</strong>
                      </p>
                      <p>
                        Age: {opp.requirements.minAge} - {opp.requirements.maxAge}
                      </p>
                      <p>
                        Gender Preference:{" "}
                        {opp.requirements.genderPreference || "No Preference"}
                      </p>
                      <p>
                        Work Hours: {opp.requirements.workHours} per day
                      </p>
                      {opp.requirements.endDate && opp.requirements.endTime && (
                        <p>
                          <strong>Ends On:</strong>{" "}
                          {new Date(
                            `${opp.requirements.endDate}T${opp.requirements.endTime}`
                          ).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      )}
                    </>
                  )}
                  <VolunteerButton onClick={(e) => handleVolunteerSignUp(opp.id, e)}>
                    Volunteer
                  </VolunteerButton>
                </ExpandedContent>
              )}
            </OpportunityCard>
          ))
        ) : (
          <p>No opportunities available at this time.</p>
        )}
      </DashboardContainer>
    </>
  );
};

export default VolunteerDashboard;
