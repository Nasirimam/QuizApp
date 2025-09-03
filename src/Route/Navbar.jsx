import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Quiz", path: "/quiz" },
    { name: "Result", path: "/result" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-white text-2xl font-bold tracking-wide">
            🎯 QuizMaster
          </h1>

          {/* Desktop Links */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white text-lg font-medium transition duration-300 
                  ${
                    location.pathname === item.path
                      ? "border-b-2 border-yellow-400 pb-1"
                      : "hover:text-yellow-300"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-purple-600">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl">
            <FiX />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium transition duration-300 
                ${
                  location.pathname === item.path
                    ? "text-purple-600 font-bold"
                    : "text-gray-700 hover:text-purple-600"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
