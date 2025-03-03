import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Footer from "../components/Footer.jsx";

/* ========================
   1. Global Styles
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
   2. Page Layout
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
   3. Animated Background Circles
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
// ... (Include more circles as needed, up to Circle20)

/* ========================
   4. Additional Styled Components
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

const SectionHeader = styled.h2`
  font-size: 2rem;
  color: #1e40af;
  margin-bottom: 1rem;
  border-bottom: 2px solid #1e40af;
  padding-bottom: 0.5rem;
`;

/* Rounded Table Container */
const TableContainer = styled.div`
  overflow: hidden;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableHead = styled.thead`
  background: #1e40af;
  color: white;
`;
const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f3f4f6;
  }
  &:hover {
    background: #e5e7eb;
  }
`;
const TableHeader = styled.th`
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
`;
const TableBody = styled.tbody`
  background: #ffffff;
`;
const TableCell = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
`;

/* Unregister Button */
const UnregisterButton = styled.button`
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

/* Helper: compute days left until an event date */
const daysLeft = (eventDate) => {
  const now = new Date();
  const evDate = new Date(eventDate);
  const diffTime = evDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/* ========================
   MyEvents Component
   ======================== */
export default function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        // Ensure this matches your actual route
        const response = await fetch("http://localhost:5000/api/opportunities/volunteer/my-opportunities", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEvents();
  }, []);

  // Separate upcoming vs completed
  const upcomingEvents = events.filter((ev) => new Date(ev.date) >= new Date());
  const completedEvents = events.filter((ev) => new Date(ev.date) < new Date());

  const handleUnregister = async (eventId) => {
    const confirmRemoval = window.confirm("Are you sure you want to unregister from this event?");
    if (!confirmRemoval) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/opportunities/volunteer/my-opportunities/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to unregister from event");
      alert("Successfully unregistered from the event!");

      // Remove from local state
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
    } catch (error) {
      console.error(error.message);
      alert(error.message);
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
        {/* Additional circles if desired */}
      </BackgroundShapesContainer>

      <Content>
        <DashboardContainer>
          <h1>My Registered Events</h1>

          {/* Upcoming Events */}
          <SectionHeader>Upcoming Events</SectionHeader>
          {upcomingEvents.length === 0 ? (
            <p>You have no upcoming events.</p>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Event</TableHeader>
                    <TableHeader>Host Name</TableHeader>
                    <TableHeader>Host Contact</TableHeader>
                    <TableHeader>Location</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>Days Left</TableHeader>
                    <TableHeader>Hours/Day</TableHeader>
                    <TableHeader>Total Days</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingEvents.map((ev) => {
                    const dLeft = daysLeft(ev.date);
                    return (
                      <TableRow key={ev.id}>
                        <TableCell>{ev.title}</TableCell>
                        <TableCell>{ev.host_name}</TableCell>
                        <TableCell>{ev.host_contact}</TableCell>
                        <TableCell>{ev.location}</TableCell>
                        <TableCell>
                          {new Date(ev.date).toLocaleDateString(undefined, {
                            dateStyle: "medium",
                          })}
                        </TableCell>
                        <TableCell>
                          {new Date(ev.date).toLocaleTimeString(undefined, {
                            timeStyle: "short",
                          })}
                        </TableCell>
                        <TableCell>{dLeft} {dLeft === 1 ? "day" : "days"}</TableCell>
                        <TableCell>{ev.hours_per_day || "N/A"}</TableCell>
                        <TableCell>{ev.total_days || "N/A"}</TableCell>
                        <TableCell>
                          <UnregisterButton onClick={() => handleUnregister(ev.id)}>
                            Unregister
                          </UnregisterButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Completed Events */}
          <SectionHeader>Completed Events</SectionHeader>
          {completedEvents.length === 0 ? (
            <p>You have no completed events.</p>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Event</TableHeader>
                    <TableHeader>Host Name</TableHeader>
                    <TableHeader>Host Contact</TableHeader>
                    <TableHeader>Location</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Time</TableHeader>
                    <TableHeader>Hours/Day</TableHeader>
                    <TableHeader>Total Days</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {completedEvents.map((ev) => (
                    <TableRow key={ev.id}>
                      <TableCell>{ev.title}</TableCell>
                      <TableCell>{ev.host_name}</TableCell>
                      <TableCell>{ev.host_contact}</TableCell>
                      <TableCell>{ev.location}</TableCell>
                      <TableCell>
                        {new Date(ev.date).toLocaleDateString(undefined, {
                          dateStyle: "medium",
                        })}
                      </TableCell>
                      <TableCell>
                        {new Date(ev.date).toLocaleTimeString(undefined, {
                          timeStyle: "short",
                        })}
                      </TableCell>
                      <TableCell>{ev.hours_per_day || "N/A"}</TableCell>
                      <TableCell>{ev.total_days || "N/A"}</TableCell>
                      <TableCell>
                        <UnregisterButton onClick={() => handleUnregister(ev.id)}>
                          Unregister
                        </UnregisterButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DashboardContainer>
      </Content>

      <Footer />
    </PageWrapper>
  );
}
