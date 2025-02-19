import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";  // Ensure this file exists!

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Initiatives from "./pages/Initiatives";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Protected Pages
import VolunteerDashboard from "./pages/VolunteerDashboard";
import HostDashboard from "./pages/HostDashboard";
import VolunteerProfile from "./pages/VolunteerProfile";
import HostProfile from "./pages/HostProfile";
import CreateOpportunity from "./pages/CreateOpportunity";
import ManageVolunteers from "./pages/ManageVolunteers";
import MyEvents from "./pages/MyEvents";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes for Volunteers */}
        <Route element={<ProtectedRoute />}>
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer-profile" element={<VolunteerProfile />} />
          <Route path="/my-events" element={<MyEvents />} />
        </Route>

        {/* Protected Routes for Hosts */}
        <Route element={<ProtectedRoute />}>
          <Route path="/host-dashboard" element={<HostDashboard />} />
          <Route path="/host-profile" element={<HostProfile />} />
          <Route path="/create-opportunity" element={<CreateOpportunity />} />
          <Route path="/manage-volunteers" element={<ManageVolunteers />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
