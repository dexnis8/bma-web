import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ isSticky = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Base classes for the navbar container
  const navbarClasses = `flex justify-between items-center px-3 sm:px-5 py-3 relative z-50 ${
    isSticky
      ? "bg-black/30 mt-5 rounded-full backdrop-blur-sm"
      : "bg-[#FFFFFF0D] rounded-full" // Transparent background with rounded corners in hero
  }`;

  return (
    <>
      <div className={navbarClasses}>
        <div className="w-24 sm:w-32">
          <img
            // src={`${isSticky ? "/black-logo.png" : "/logo.png"}`}
            src="/logo.png"
            alt="BMA logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/800x450/1E296B/FFFFFF?text=BMA+PureFix+Team";
            }}
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-[32px] text-white">
          <li>
            <Link
              to="/"
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/" ? "font-bold" : "font-normal"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/about" ? "font-bold" : "font-normal"
              }`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/products" ? "font-bold" : "font-normal"
              }`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/contact" ? "font-bold" : "font-normal"
              }`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Desktop CTA Button */}
        <div className="hidden md:block ">
          <button
            onClick={() => navigate("/request-deal")}
            className="px-6 py-[14px] rounded-full text-white font-semibold cursor-pointer hover:bg-[#FF0000]/80 transition-all duration-300 bg-[#FF0000]"
          >
            Request Dealership
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown - With animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`fixed inset-x-0 top-[76px] bg-[#1E296B] rounded-lg shadow-lg z-[1000] py-4 md:hidden mx-4`}
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <motion.ul
              className="flex flex-col space-y-3 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <Link
                  to="/"
                  className={`block py-2 text-white hover:bg-[#243280] px-3 rounded transition-colors ${
                    location.pathname === "/" ? "font-bold" : "font-normal"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                <Link
                  to="/about"
                  className={`block py-2 text-white hover:bg-[#243280] px-3 rounded transition-colors ${
                    location.pathname === "/about" ? "font-bold" : "font-normal"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <Link
                  to="/products"
                  className={`block py-2 text-white hover:bg-[#243280] px-3 rounded transition-colors ${
                    location.pathname === "/products"
                      ? "font-bold"
                      : "font-normal"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                <Link
                  to="/contact"
                  className={`block py-2 text-white hover:bg-[#243280] px-3 rounded transition-colors ${
                    location.pathname === "/contact"
                      ? "font-bold"
                      : "font-normal"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </motion.li>
              <motion.li
                className="pt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                <button className="w-full px-6 py-[14px] rounded-full text-white font-semibold cursor-pointer hover:bg-[#FF0000]/80 transition-all duration-300 bg-[#FF0000] text-center">
                  <Link to="/request-deal" onClick={() => setIsMenuOpen(false)}>
                    Request Dealership
                  </Link>{" "}
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
