// src/components/Header.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "/logo.png";

const baseNavClass = "block px-3 py-2 rounded hover:bg-green-50 transition";
const activeNavClass = "text-green-800 font-semibold border-b-2 border-green-800";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo + Title */}
                <NavLink to="/" className="flex items-center space-x-3">
                    <img src={logo} alt="MinuteMint" className="h-10 w-10 object-contain" />
                    <div>
                        <h1 className="text-2xl font-bold lowercase text-gray-800">
                            minutemint
                        </h1>
                        <p className="text-xs md:text-sm text-gray-500">
                            Mint the moment. Make it slick, make it quick.
                        </p>
                    </div>
                </NavLink>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {[
                        { to: "/", label: "All Tips" },
                        { to: "/spinner", label: "Spinner" },
                        { to: "/add", label: "Add Tip" },
                    ].map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `${baseNavClass} ${isActive ? activeNavClass : "text-gray-600 hover:text-green-800"}`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden p-2 rounded hover:bg-gray-100"
                    onClick={() => setOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Panel */}
            {open && (
                <div className="md:hidden bg-white shadow-inner">
                    <nav className="px-4 py-3 space-y-1">
                        {[
                            { to: "/", label: "All Tips" },
                            { to: "/spinner", label: "Spinner" },
                            { to: "/add", label: "Add Tip" },
                        ].map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `${baseNavClass} ${isActive ? activeNavClass : "text-gray-600"}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
