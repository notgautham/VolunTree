import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
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
   Page Wrapper and Content
   ======================== */
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  position: relative;
  z-index: 1;
`;

/* ========================
   Animated Background Circles
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
   Container & Table Styles
   ======================== */
const DashboardContainer = styled.div`
  padding: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
`;

/* Make the opportunity title smaller and above the table */
const OpportunityTitle = styled.h3`
  font-size: 1.3rem;
  color: #4b2e83;
  margin-bottom: 0.75rem;
`;

/* Table styling */
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

const TableHead = styled.thead`
  background: #4b2e83;
  color: #ffffff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9fafb;
  }
  &:hover {
    background: #f3f4f6;
  }
`;

const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const RemoveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #dc2626;
  }
`;

const ManageVolunteers = () => {
  const [registrations, setRegistrations] = useState({});

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/opportunities/host/registrations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        // Group registrations by opportunity_id
        const grouped = data.reduce((acc, curr) => {
          const oppId = curr.opportunity_id;
          if (!acc[oppId]) {
            acc[oppId] = {
              title: curr.title,
              volunteers: [],
            };
          }
          if (curr.volunteer_id) {
            acc[oppId].volunteers.push({
              id: curr.volunteer_id,
              full_name: curr.full_name,
              email: curr.email,
              contact_number: curr.contact_number,
              age: curr.age,
              gender: curr.gender,
              address: curr.address,
            });
          }
          return acc;
        }, {});
        setRegistrations(grouped);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };

    fetchRegistrations();
  }, []);

  const handleRemove = async (opportunityId, volunteerId) => {
    // Confirmation popup
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this volunteer?"
    );
    if (!confirmRemoval) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/opportunities/volunteer/${opportunityId}/${volunteerId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        alert("Volunteer removed successfully.");
        // Update state by removing the volunteer from the group
        setRegistrations((prev) => {
          const updated = { ...prev };
          updated[opportunityId].volunteers = updated[opportunityId].volunteers.filter(
            (vol) => vol.id !== volunteerId
          );
          return updated;
        });
      } else {
        const errData = await response.json();
        alert("Error: " + errData.message);
      }
    } catch (error) {
      console.error("Error removing volunteer:", error);
      alert("An error occurred while removing the volunteer.");
    }
  };

  return (
    <PageWrapper>
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

      <Content>
        <DashboardContainer>
          <h1>Manage Volunteers</h1>
          {Object.keys(registrations).length > 0 ? (
            Object.keys(registrations).map((oppId) => (
              <div key={oppId}>
                {/* Smaller title for the opportunity */}
                <OpportunityTitle>
                  {registrations[oppId].title}
                </OpportunityTitle>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeader>Full Name</TableHeader>
                      <TableHeader>Email</TableHeader>
                      <TableHeader>Contact Number</TableHeader>
                      <TableHeader>Age</TableHeader>
                      <TableHeader>Gender</TableHeader>
                      <TableHeader>Address</TableHeader>
                      <TableHeader>Action</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {registrations[oppId].volunteers.length > 0 ? (
                      registrations[oppId].volunteers.map((vol) => (
                        <TableRow key={vol.id}>
                          <TableCell>{vol.full_name}</TableCell>
                          <TableCell>{vol.email}</TableCell>
                          <TableCell>{vol.contact_number}</TableCell>
                          <TableCell>{vol.age}</TableCell>
                          <TableCell>{vol.gender}</TableCell>
                          <TableCell>{vol.address}</TableCell>
                          <TableCell>
                            <RemoveButton
                              onClick={() => handleRemove(oppId, vol.id)}
                            >
                              Remove
                            </RemoveButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="7" style={{ textAlign: "center" }}>
                          No volunteers registered yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ))
          ) : (
            <p>No volunteer registrations available.</p>
          )}
        </DashboardContainer>
      </Content>
    </PageWrapper>
  );
};

export default ManageVolunteers;
