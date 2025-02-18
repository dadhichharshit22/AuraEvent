import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import EventSearch from "../components/EventSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import {
  LogOut,
  User,
  Heart,
  Ticket,
  Calendar,
  CalendarCheck2,
} from "lucide-react";

interface NavbarProps {
  isRegistered: boolean;
  onLogout: () => void;
  setIsRegistered:  React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (params: { location: string; tags: string; month: string }) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isRegistered,
  onLogout,
  setIsRegistered,
  onSearch,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    toast.success("Logged out successfully");
    setIsRegistered(false);
    navigate("/");
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="rounded-md flex flex-col md:flex-row justify-between items-center bg-custom-purple space-x-2 p-4 shadow-lg">
      <h1
        className="font-meow text-6xl text-black cursor-pointer"
        onClick={() => navigate("/")}
      >
        AuraEvents
      </h1>
      {isHomePage && <EventSearch onSearch={onSearch} />}
      <div className="flex items-center space-x-6">
        {/* <Link to="/" className="text-xl text-white hover:underline">
          Home
        </Link>
        {isRegistered && (
          <Link to="/dashboard" className="text-xl text-white hover:underline">
            Dashboard
          </Link>
        )} */}
        {isRegistered ? (
          <>
            <Button onClick={() => navigate("/create-event")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="currentColor"
                    fill-opacity="0.25"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="square"
                    stroke-linejoin="round"
                    stroke-width="1.2"
                    d="M12 8v8m4-4H8"
                  />
                </g>
              </svg>
              Create Event
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{"User"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/create-event")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        fill="currentColor"
                        fill-opacity="0.25"
                      />
                      <path
                        stroke="currentColor"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                        stroke-width="1.2"
                        d="M12 8v8m4-4H8"
                      />
                    </g>
                  </svg>
                  Create Event
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/manage-events")}>
                  <CalendarCheck2 className="mr-2 h-4 w-4" />
                  Manage my events
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/registered-events")}
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  Registered Event
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <Heart className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link to="/login" className="text-xl text-white hover:underline">
              SignIn
            </Link>
            <Link to="/register" className="text-xl text-white hover:underline">
              SignUp
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
