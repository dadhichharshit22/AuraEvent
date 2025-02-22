import React from "react";
import { Link } from "react-router-dom";
import { Home, Calendar, List, UserCircle, PlusCircle } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-auto bg-gray-800 text-gray-100">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Dashboard <span className="text-xl">🎯</span>
        </h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/create-event"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <PlusCircle size={20} />
              <span>Create Event</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/manage-events"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Calendar size={20} />
              <span>Manage Events</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/registered-events"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <List size={20} />
              <span>Registered Events</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <UserCircle size={20} />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
