import React, { useState, useEffect } from "react";

const HostProfile = () => {
  const [profile, setProfile] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    contactNumber: "",
    address: "",
    websiteUrl: "",
    description: "",
  });

  useEffect(() => {
    // Fetch the host profile from backend API
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/host/profile", {
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
      const response = await fetch("/api/host/profile/update", {
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
      <h1>Host Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Organization Name:
          <input type="text" name="organizationName" value={profile.organizationName} onChange={handleChange} />
        </label>

        <label>
          Contact Person:
          <input type="text" name="contactPerson" value={profile.contactPerson} onChange={handleChange} />
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
          Website URL:
          <input type="url" name="websiteUrl" value={profile.websiteUrl} onChange={handleChange} />
        </label>

        <label>
          Description:
          <textarea name="description" value={profile.description} onChange={handleChange} />
        </label>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default HostProfile;
