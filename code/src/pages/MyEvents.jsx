import React, { useState, useEffect } from "react";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch the events the volunteer has registered for
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/volunteer/my-events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

  const handleUnregister = async (eventId) => {
    try {
      const response = await fetch(`/api/volunteer/my-events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to unregister from event");

      alert("Successfully unregistered from the event!");
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>My Registered Events</h1>
      {events.length === 0 ? (
        <p>You have not registered for any events yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>
                  <button onClick={() => handleUnregister(event.id)}>Unregister</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyEvents;
