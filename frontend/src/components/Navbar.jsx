import React, { useState, useEffect } from "react";
import { Home, BookOpen, Brain, Calendar, Map, Newspaper, Menu, X, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import API from "../api/axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const isLoggedIn = useSelector((state) => state.auth.status);

  // Fetch profile picture
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await API.get("/user/profile-picture");
        if (response.data.success) {
          setProfilePicture(response.data.data.profilePicture);
        }
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
      }
    };
    if (userData) {
      fetchProfilePicture();
    }
  }, [userData]);

  const getProfilePictureUrl = () => {
    if (!profilePicture) return null;
    const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:3000';
    return `${baseUrl}${profilePicture}`;
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/auth/login", { replace: true });
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Learning", path: "/notes", icon: BookOpen },
    { name: "Quiz", path: "/quiz", icon: Brain },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Maps", path: "/maps", icon: Map },
    { name: "News", path: "/news", icon: Newspaper },
    { name: "Profile", path: "/profile", icon: User, isProfile: true },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            onClick={() => navigate("/")}
          >
            <span className="text-2xl font-bold text-blue-600">🎓</span>
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">Sarvottam Institute</span>
          </div>

          {/* Desktop Navigation */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.slice(0, -1).map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-1 font-medium transition-colors ${active
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                      }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            {isLoggedIn && (
              <input
                type="text"
                placeholder="Search"
                className="hidden lg:block w-48 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            {/* Auth Buttons */}
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="hidden sm:block px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-medium cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="hidden sm:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* User Profile Display */}
                <div className="hidden sm:flex items-center gap-3">
                  {profilePicture ? (
                    <img
                      src={getProfilePictureUrl()}
                      alt="Profile"
                      className="w-9 h-9 rounded-full border-2 border-blue-600 cursor-pointer hover:opacity-80"
                      onClick={() => navigate("/profile")}
                    />
                  ) : (
                    <div
                      className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:bg-blue-700"
                      onClick={() => navigate("/profile")}
                    >
                      <User size={18} />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{userData?.name?.split(" ")[0]}</p>
                    <p className="text-xs text-gray-500">Class {userData?.class === 9 ? "IX" : "X"}</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium cursor-pointer"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-white z-30 md:hidden overflow-y-auto">
          <div className="p-4 space-y-2">
            {isLoggedIn && (
              <>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {item.isProfile && profilePicture ? (
                        <div className="w-5 h-5 rounded-full overflow-hidden border-2 border-blue-600">
                          <img
                            src={getProfilePictureUrl()}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <Icon size={20} />
                      )}
                      <span>{item.name}</span>
                    </button>
                  );
                })}
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition font-medium"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            )}
            {!isLoggedIn && (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate("/auth/login");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/auth/signup");
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
