import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About VolunTree</h1>
        <p>Connecting passionate volunteers with impactful projects worldwide.</p>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision">
        <div className="mission">
          <h2>🌍 Our Mission</h2>
          <p>
            VolunTree is dedicated to bridging the gap between volunteers and organizations,
            creating meaningful change across communities through collaborative efforts.
          </p>
        </div>
        <div className="vision">
          <h2>🚀 Our Vision</h2>
          <p>
            To become the world's leading platform for volunteering, fostering a culture
            of compassion, skill-sharing, and global impact.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>📌 Sign Up</h3>
            <p>Create a profile and select your interests.</p>
          </div>
          <div className="step">
            <h3>🔎 Find Opportunities</h3>
            <p>Browse projects that match your passion.</p>
          </div>
          <div className="step">
            <h3>🌱 Contribute & Grow</h3>
            <p>Join projects, collaborate, and make an impact.</p>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="impact">
        <h2>🌟 Our Impact</h2>
        <p>Since our launch, we have helped:</p>
        <div className="impact-stats">
          <div className="stat">
            <h3>🌎 50+ Countries</h3>
            <p>VolunTree has connected volunteers worldwide.</p>
          </div>
          <div className="stat">
            <h3>👥 10,000+ Volunteers</h3>
            <p>Passionate individuals making a difference.</p>
          </div>
          <div className="stat">
            <h3>📢 1,500+ Projects</h3>
            <p>Helping organizations achieve their goals.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>📩 Get in Touch</h2>
        <p>Have questions or want to collaborate? Reach out to us!</p>
        <p>Email: <a href="mailto:support@voluntree.org">support@voluntree.org</a></p>
      </section>
    </div>
  );
};

export default About;
