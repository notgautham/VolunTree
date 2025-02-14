import React from "react";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    description: "Join us in cleaning up the beaches of Mumbai and contribute towards a cleaner environment.",
    location: "Juhu Beach, Mumbai",
    date: "March 15, 2025",
    image: "beach-cleanup.jpg"
  },
  {
    id: 2,
    title: "Food Distribution for Underprivileged",
    description: "Help distribute food packages to underprivileged families in local communities.",
    location: "Connaught Place, Delhi",
    date: "March 25, 2025",
    image: "food-drive.jpg"
  },
  {
    id: 3,
    title: "Tree Plantation Drive",
    description: "Participate in a large-scale tree plantation drive to promote a greener future.",
    location: "Cubbon Park, Bengaluru",
    date: "April 10, 2025",
    image: "tree-plantation.jpg"
  },
  {
    id: 4,
    title: "Teaching Underprivileged Children",
    description: "Volunteer to teach underprivileged children basic subjects and life skills.",
    location: "Salt Lake, Kolkata",
    date: "April 20, 2025",
    image: "teaching.jpg"
  },
  {
    id: 5,
    title: "Plastic Waste Awareness Campaign",
    description: "Spread awareness about plastic waste and help communities reduce their plastic usage.",
    location: "Marine Drive, Mumbai",
    date: "April 30, 2025",
    image: "plastic-awareness.jpg"
  }
];

const Projects = () => {
  return (
    <div className="projects-container">
      {/* Hero Section */}
      <div className="projects-hero">
        <h1>Explore Volunteer Projects</h1>
        <p>Find meaningful opportunities to contribute to communities across India.</p>
      </div>

      {/* Projects List */}
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <img src={`/images/${project.image}`} alt={project.title} className="project-image"/>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="project-info">
              <span>📍 {project.location}</span>
              <span>📅 {project.date}</span>
            </div>
            <div className="project-actions">
              <button className="details-btn">View Details</button>
              <button className="join-btn">Join Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
