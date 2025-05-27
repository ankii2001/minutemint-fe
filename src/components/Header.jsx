// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import logo from "/logo.png";

const baseNavClass = "text-gray-600 hover:text-green-800 px-2 py-1 transition";
const activeNavClass = "text-green-800 border-b-2 border-green-800 font-semibold";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="MinuteMint"
            className="h-10 w-10 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold lowercase text-gray-800">
              minutemint
            </h1>
            <p className="text-sm text-gray-500">
              Mint the moment. Make it slick, make it quick.
            </p>
          </div>
        </NavLink>

        <nav className="flex items-center space-x-6">
          {[
            { to: "/",    label: "Spinner" },
            { to: "/tips", label: "All Tips" },
            { to: "/add",  label: "Add Tip" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}                 // exact match for home
              className={({ isActive }) =>
                `${baseNavClass} ${isActive ? activeNavClass : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
