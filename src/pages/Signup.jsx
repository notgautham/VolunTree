import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [role, setRole] = useState("volunteer"); // Default role is Volunteer
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    skills: "",
    hostName: "",
    website: "",
    hostType: "",
    agreeToTerms: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert(`Account created successfully as a ${role}!`);
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <p>Join as a Volunteer or a Host and make an impact!</p>

      {/* Role Selection */}
      <div className="role-selection">
        <button
          className={role === "volunteer" ? "active" : ""}
          onClick={() => setRole("volunteer")}
        >
          Sign Up as Volunteer
        </button>
        <button
          className={role === "host" ? "active" : ""}
          onClick={() => setRole("host")}
        >
          Sign Up as Host
        </button>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="City, State, Country"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* Volunteer Fields */}
        {role === "volunteer" && (
          <textarea
            name="skills"
            placeholder="Skills & Experience (Optional)"
            value={formData.skills}
            onChange={handleChange}
          />
        )}

        {/* Host Fields */}
        {role === "host" && (
          <>
            <input
              type="text"
              name="hostName"
              placeholder="Organization/Company Name"
              value={formData.hostName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="website"
              placeholder="Website / Social Media (Optional)"
              value={formData.website}
              onChange={handleChange}
            />

            <select name="hostType" value={formData.hostType} onChange={handleChange} required>
              <option value="">Select Host Type</option>
              <option value="individual">Individual</option>
              <option value="nonprofit">Nonprofit Organization</option>
              <option value="company">Company</option>
            </select>
          </>
        )}

        {/* Terms Agreement */}
        <label className="terms">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          I agree to the Terms & Conditions
        </label>

        <button type="submit" className="signup-btn">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
