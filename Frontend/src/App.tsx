import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/SinUpPage";
import Login from "./pages/SignInPage";
import EventDetails from "./pages/EventDetailsPage";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateEvent from "./pages/CreateEventPage";
import ManageEvents from "./pages/ManageEventsPage";
import Profile from "./pages/ProfilePage";
import RegisteredEvents from "./pages/RegisteredEventsPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ChangePassword from "./pages/ChangePasswordPage";
import { useAuth } from "./hooks/useAuth";
import { useEvents } from "./hooks/useEvent";

const App: React.FC = () => {
  const { auth, setIsRegistered, handleRegister, handleLogout } = useAuth();
  const { filteredEvents, setFilteredEvents, handleSearch } = useEvents();
  const email = localStorage.getItem("email");

  return (
    <Router>
      <div className="m-1 font-lexend text-white min-h-screen flex flex-col gap-2">
        <Navbar
          isRegistered={auth.isRegistered}
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
                  isRegistered={auth.isRegistered}
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
                auth.isRegistered ? (
                  <Navigate to="/" />
                ) : (
                  <Login onLogin={handleRegister} />
                )
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/change-password"
              element={<ChangePassword email={email} />}
            />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route
              path="/dashboard/*"
              element={auth.isRegistered ? "" : <Navigate to="/login" />}
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
