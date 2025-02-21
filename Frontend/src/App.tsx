import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

import EventDetails from "./pages/EventDetails";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateEvent from "./pages/CreateEvent";
import ManageEvents from "./pages/ManageEvents";
import Profile from "./pages/Profile";
import RegisteredEvents from "./pages/RegisteredEvents";
import axios from "axios";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const email = localStorage.getItem("email");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsRegistered(true);
    }

    axios
      .get("http://localhost:8085/api/events/getAllEvents")
      .then((response) => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all events:", error);
      });
  }, []);

  const handleRegister = (token: string) => {
    localStorage.setItem("token", token);
    setIsRegistered(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsRegistered(false);
  };

  const handleSearch = (searchParams: {
    location: string;
    tags: string;
    month: string;
  }) => {
    let filtered = [...events];

    if (searchParams.location) {
      filtered = filtered.filter((event) =>
        event.location
          .toLowerCase()
          .includes(searchParams.location.toLowerCase())
      );
    }

    if (searchParams.tags) {
      const searchTags = searchParams.tags
        .toLowerCase()
        .split(",")
        .map((tag) => tag.trim());
      filtered = filtered.filter(
        (event) =>
          event.category &&
          searchTags.some((tag) => event.category.toLowerCase().includes(tag))
      );
    }
    
    setFilteredEvents(filtered);
  };

  return (
    <Router>
      <div className="m-1 font-lexend text-white min-h-screen flex flex-col gap-2">
        <Navbar
          isRegistered={isRegistered}
          setIsRegistered={setIsRegistered}
          onLogout={handleLogout}
          onSearch={handleSearch}
        />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isRegistered={isRegistered}
                  onLogout={handleLogout}
                  filteredEvents={filteredEvents}
                  setFilteredEvents={setFilteredEvents}
                />
              }
            />
            <Route
              path="/register"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/login"
              element={
                isRegistered ? (
                  <Navigate to="/" />
                ) : (
                  <Login onLogin={handleRegister} />
                )
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword email={email} />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route
              path="/dashboard/*"
              element={isRegistered ? "" : <Navigate to="/login" />}
            />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/manage-events" element={<ManageEvents />} />
            <Route path="/registered-events" element={<RegisteredEvents />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
