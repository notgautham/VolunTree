import React, { useState, useEffect } from "react";

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    // Fetch volunteers registered for host's opportunities
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("/api/host/manage-volunteers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch volunteers");

        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchVolunteers();
  }, []);

  const handleRemove = async (volunteerId) => {
    try {
      const response = await fetch(`/api/host/manage-volunteers/${volunteerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to remove volunteer");

      alert("Volunteer removed successfully!");
      setVolunteers(volunteers.filter((vol) => vol.id !== volunteerId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Manage Volunteers</h1>
      {volunteers.length === 0 ? (
        <p>No volunteers have registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Opportunity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer.id}>
                <td>{volunteer.fullName}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.contactNumber}</td>
                <td>{volunteer.opportunityTitle}</td>
                <td>
                  <button onClick={() => handleRemove(volunteer.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageVolunteers;
