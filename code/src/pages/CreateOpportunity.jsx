import React, { useState } from "react";

const CreateOpportunity = () => {
  const [opportunity, setOpportunity] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    volunteersRequired: "",
    ageGroup: "",
    genderPreference: "",
    workHours: "",
  });

  const handleChange = (e) => {
    setOpportunity({ ...opportunity, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/host/create-opportunity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(opportunity),
      });

      if (!response.ok) throw new Error("Failed to create opportunity");

      alert("Opportunity created successfully!");
      setOpportunity({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        volunteersRequired: "",
        ageGroup: "",
        genderPreference: "",
        workHours: "",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Create a Volunteering Opportunity</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={opportunity.title} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={opportunity.description} onChange={handleChange} required />
        </label>

        <label>
          Location:
          <input type="text" name="location" value={opportunity.location} onChange={handleChange} required />
        </label>

        <label>
          Date:
          <input type="date" name="date" value={opportunity.date} onChange={handleChange} required />
        </label>

        <label>
          Time:
          <input type="time" name="time" value={opportunity.time} onChange={handleChange} required />
        </label>

        <label>
          Volunteers Required:
          <input type="number" name="volunteersRequired" value={opportunity.volunteersRequired} onChange={handleChange} required />
        </label>

        <label>
          Age Group:
          <input type="text" name="ageGroup" value={opportunity.ageGroup} onChange={handleChange} required />
        </label>

        <label>
          Gender Preference:
          <select name="genderPreference" value={opportunity.genderPreference} onChange={handleChange}>
            <option value="">No Preference</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
          Work Hours:
          <input type="number" name="workHours" value={opportunity.workHours} onChange={handleChange} required />
        </label>

        <button type="submit">Create Opportunity</button>
      </form>
    </div>
  );
};

export default CreateOpportunity;
