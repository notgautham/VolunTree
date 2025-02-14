import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-content">
            <h1>Unlock Your <span className="highlight">Volunteering</span> Journey</h1>
            <p>Explore impactful opportunities, contribute to causes, and build meaningful connections.</p>
            <Link to="/signup">
              <button className="cta-btn">Join as Volunteer</button>
            </Link>
          </div>
          <div className="hero-image">
            <img src="/assets/hero-volunteer.png" alt="Volunteering Illustration" />
          </div>
        </div>

        {/* About Section */}
        <section className="about">
          <h2>What is <span className="highlight">VolunTree?</span></h2>
          <p>VolunTree is a platform that connects passionate volunteers with organizations and projects that need support.</p>
          <div className="about-cards">
            <div className="about-card">
              <h3>🌍 Global Reach</h3>
              <p>Find volunteering opportunities worldwide.</p>
            </div>
            <div className="about-card">
              <h3>🤝 Meaningful Impact</h3>
              <p>Work on real projects that drive change.</p>
            </div>
            <div className="about-card">
              <h3>📈 Skill Development</h3>
              <p>Enhance your skills through hands-on experience.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h2>How <span className="highlight">It Works</span></h2>
          <div className="steps">
            <div className="step">
              <h3>1. Sign Up</h3>
              <p>Create a profile and select your interests.</p>
            </div>
            <div className="step">
              <h3>2. Find Opportunities</h3>
              <p>Browse projects that match your passion.</p>
            </div>
            <div className="step">
              <h3>3. Contribute & Grow</h3>
              <p>Join projects, collaborate, and make a difference.</p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories">
          <h2>Explore <span className="highlight">Opportunities</span></h2>
          <div className="category-grid">
            <Link to="/projects" className="category-box green">
              <h3>Find Projects</h3>
              <p>Join impactful initiatives</p>
            </Link>
            <Link to="/about" className="category-box blue">
              <h3>About Us</h3>
              <p>Learn more about our mission</p>
            </Link>
            <Link to="/contact" className="category-box purple">
              <h3>Get in Touch</h3>
              <p>Connect with our team</p>
            </Link>
            <Link to="/developers" className="category-box yellow">
              <h3>Meet the Developers</h3>
              <p>Know the people behind VolunTree</p>
            </Link>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us">
          <h2>Why <span className="highlight">Choose Us?</span></h2>
          <div className="features">
            <div className="feature-card">
              <h3>✅ Verified Organizations</h3>
              <p>We ensure projects are legitimate and impactful.</p>
            </div>
            <div className="feature-card">
              <h3>💼 Build Your Resume</h3>
              <p>Gain valuable experience and add to your portfolio.</p>
            </div>
            <div className="feature-card">
              <h3>🛡️ Secure & Trusted</h3>
              <p>We prioritize privacy and data security.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
