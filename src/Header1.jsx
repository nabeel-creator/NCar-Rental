import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "./api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constans";
import {Link, useNavigate} from "react-router-dom";
const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const access = localStorage.getItem(ACCESS_TOKEN);
      if (!access) return; 
      try {
        const response = await api.get("/user/view/");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          setUser(null);
        }
      }
    };

    loadUser();
  }, []); 
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null);
    navigate("/login");
  };

  const navItems = ["Home", "About", "Contact"];

  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY && currentScroll > 80) {

      setHidden(true);
    } else {

      setHidden(false);
    }

    setLastScrollY(currentScroll);
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-[9999] backdrop-blur-md bg-zinc-950/70 border-b border-zinc-800/50"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
          <div className="flex items-center">
            <span className="text-2xl sm:text-3xl font-thin text-lime-500">
              N
            </span>
            <span className="text-2xl sm:text-3xl font-medium text-white">
              Car Rental
            </span>
          </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to="/"
                className="relative text-zinc-300 hover:text-white transition-colors duration-200 group text-sm lg:text-base"
              >
                <motion.div whileHover={{ y: -2 }}>
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-lime-500 group-hover:w-full transition-all duration-300"></span>
                </motion.div>
              </Link>
            ))}
          </div>

             {user ? (
        <div
          className="relative"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <button
            onClick={() => setIsMenuOpen((v) => !v)} // click for mobile
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-500 text-white font-semibold focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            {(
              (user.username || "?").toString().trim().charAt(0) || "?"
            ).toUpperCase()}
          </button>

          <div
            className={`absolute right-0 mt-2 w-56 bg-black text-white border border-lime-400 rounded shadow-md z-50 transition-transform origin-top-right ${
              isMenuOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white font-semibold text-lg">
                  {(
                    (user.username || "?").toString().trim().charAt(0) || "?"
                  ).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium">{user.username}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>

              <div className="mt-3">
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-1 rounded hover:bg-gray-700"
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left mt-2 px-2 py-1 rounded hover:bg-red-300 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Link
              to="/login"
              className="text-zinc-300 hover:text-white transition-colors duration-200 px-4 py-2 text-sm lg:text-base"
            >
              Login
            </Link>
            <Link to="/register">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(163, 230, 53, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-lime-500 hover:bg-lime-600 text-zinc-950 font-semibold px-6 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base"
            >
              Sign Up
            </motion.button>
            </Link>
          </div>

        
      )}

         
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to="/"
                className="block text-zinc-300 hover:text-lime-500 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-zinc-800">
              <Link to="/login" className="block w-full text-left text-zinc-300 hover:text-white transition-colors duration-200 py-2">
                Login
              </Link>
              <Link to="/register" className="block w-full bg-lime-500 hover:bg-lime-600 text-zinc-950 font-semibold px-6 py-2 rounded-lg transition-all duration-200">
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;
