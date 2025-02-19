import React, { useState, useEffect } from "react";

const VolunteerProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    // Fetch the volunteer profile from backend API
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/volunteer/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/volunteer/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Volunteer Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={profile.email} readOnly />
        </label>

        <label>
          Contact Number:
          <input type="text" name="contactNumber" value={profile.contactNumber} onChange={handleChange} />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={profile.address} onChange={handleChange} />
        </label>

        <label>
          Age:
          <input type="number" name="age" value={profile.age} onChange={handleChange} />
        </label>

        <label>
          Gender:
          <select name="gender" value={profile.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default VolunteerProfile;
