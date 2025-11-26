import React, { useState } from "react";
import { CircleUser, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Maps", path: "/maps" },
    { name: "News", path: "/news" },
    { name: "Learning", path: "/notes" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className={`fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg ${!isOpen ? "text-white bg-purple-600" : "text-white bg-purple-800"
          }`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 transition-all duration-300 z-40
           ${isOpen ? "translate-x-0" : "-translate-x-full"} 
           md:translate-x-0
           bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800
           flex flex-col text-white shadow-2xl`}
      >
        {/* Logo Section */}
        <div className="pt-8 pb-8 px-6">
          <h1
            className="text-2xl font-bold cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            EduGenie
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-6">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  className="w-full text-left text-lg font-medium py-3 
                           hover:bg-white/10 hover:transform hover:translate-x-2 
                           transition-all duration-200 cursor-pointer
                           focus:outline-none focus:bg-white/10"
                  onClick={() => {
                    setIsOpen(false);
                    navigate(item.path);
                  }}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default Navbar;
