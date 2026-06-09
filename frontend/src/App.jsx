import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Inventory from "./pages/Inventory";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem("isLoggedIn") ===
        "true"
    );

  const handleLogout = () => {
    localStorage.removeItem(
      "isLoggedIn"
    );

    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <Login
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      {/* Sidebar */}

      <div
      className={`w-20 md:w-64 p-3 md:p-5 min-h-screen ${
          darkMode
            ? "bg-slate-800"
            : "bg-white shadow-xl"
        }`}
      >
        <h1 className="text-xl md:text-3xl font-bold mb-8">
          Amdox ERP
        </h1>

        {/* Theme */}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="mb-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="mb-8 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          🚪 Logout
        </button>

        <ul className="space-y-4 text-sm md:text-lg">

          <li>
            <Link to="/">
              📊 Dashboard
            </Link>
          </li>

          <li>
            <Link to="/employees">
              👨‍💼 Employees
            </Link>
          </li>

          <li>
            <Link to="/inventory">
              📦 Inventory
            </Link>
          </li>

          <li>
            <Link to="/projects">
              📁 Projects
            </Link>
          </li>

          <li>
            <Link to="/reports">
              📈 Reports
            </Link>
          </li>

        </ul>
      </div>

      {/* Content */}

      <div className="flex-1 p-4 md:p-8 overflow-auto">

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/employees"
            element={<Employees />}
          />

          <Route
            path="/inventory"
            element={<Inventory />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

        </Routes>

      </div>
    </div>
  );
}

export default App;