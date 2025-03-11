import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import Register from "./pages/SinUpPage";
import Login from "./pages/SignInPage";
import EventDetails from "./pages/EventDetailsPage";
import CreateEvent from "./pages/CreateEventPage";
import ManageEvents from "./pages/ManageEventsPage";
import Profile from "./pages/ProfilePage";
import RegisteredEvents from "./pages/RegisteredEventsPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ChangePassword from "./pages/ChangePasswordPage";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import { useAuth } from "./hooks/useAuth";
import { useEvents } from "./hooks/useEvent";

const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password",
  EVENT_DETAILS: "/event/:id",
  CREATE_EVENT: "/create-event",
  MANAGE_EVENTS: "/manage-events",
  REGISTERED_EVENTS: "/registered-events",
  PROFILE: "/profile",
  DASHBOARD: "/dashboard/*",
};

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { auth } = useAuth();
  return auth.isRegistered ? element : <Navigate to={ROUTES.LOGIN} />;
};

const App: React.FC = () => {
  const { auth, setIsRegistered, handleRegister, handleLogout } = useAuth();
  const { filteredEvents, setFilteredEvents, handleSearch } = useEvents();
  const email = localStorage.getItem("email") || "";

  const renderRoutes = () => (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage isRegistered={auth.isRegistered} onLogout={handleLogout} filteredEvents={filteredEvents} setFilteredEvents={setFilteredEvents} />} />
      <Route path={ROUTES.REGISTER} element={<Register onRegister={handleRegister} />} />
      <Route path={ROUTES.LOGIN} element={auth.isRegistered ? <Navigate to={ROUTES.HOME} /> : <Login onLogin={handleRegister} />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword email={email} />} />
      <Route path={ROUTES.EVENT_DETAILS} element={<EventDetails />} />
      <Route path={ROUTES.DASHBOARD} element={<PrivateRoute element={<div>Dashboard Component</div>} />} />
      <Route path={ROUTES.CREATE_EVENT} element={<PrivateRoute element={<CreateEvent />} />} />
      <Route path={ROUTES.MANAGE_EVENTS} element={<PrivateRoute element={<ManageEvents />} />} />
      <Route path={ROUTES.REGISTERED_EVENTS} element={<PrivateRoute element={<RegisteredEvents />} />} />
      <Route path={ROUTES.PROFILE} element={<PrivateRoute element={<Profile />} />} />
    </Routes>
  );

  return (
    <Router>
      <div className="m-1 font-lexend text-white min-h-screen flex flex-col gap-2">
        <Navbar isRegistered={auth.isRegistered} setIsRegistered={setIsRegistered} onLogout={handleLogout} onSearch={handleSearch} />
        <div className="flex-grow">{renderRoutes()}</div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
