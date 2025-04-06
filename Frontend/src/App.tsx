import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { fetchAllEvents, filterEvents } from "./store/slices/eventSlice";
import { logout } from "./store/slices/authSlice";
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

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { filteredEvents } = useSelector((state: RootState) => state.events);
  const email = localStorage.getItem("email");

  useEffect(() => {
    // Fetch events when the app loads
    // Using any to avoid type errors with AsyncThunk
    dispatch(fetchAllEvents() as any);
  }, [dispatch]);

  const handleSearch = (searchParams: { location: string; tags: string; month: string }) => {
    dispatch(filterEvents(searchParams as any));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div className="m-1 font-lexend text-white min-h-screen flex flex-col gap-2">
        <Navbar
          isRegistered={isAuthenticated}
          onLogout={handleLogout}
          onSearch={handleSearch}
        />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isRegistered={isAuthenticated}
                  onLogout={handleLogout}
                  filteredEvents={filteredEvents}
                />
              }
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login />
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
              element={isAuthenticated ? "" : <Navigate to="/login" />}
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
