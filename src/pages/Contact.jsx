// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CTAsec } from "../components/CTAsec";
import { useState, useRef, useEffect } from "react";
import { FAQ } from "../components/FAQ";
import { ScrollToTop } from "../components/ScrollToTop";
export const Contact = () => {
  // Animation controls
  const heroControls = useAnimation();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);

    // Start hero animations immediately
    heroControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [heroControls]);

  // List of countries with their codes
  const countries = [
    { code: "+1", name: "US", flag: "🇺🇸" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+52", name: "Mexico", flag: "🇲🇽" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+254", name: "Kenya", flag: "🇰🇪" },
    { code: "+20", name: "Egypt", flag: "🇪🇬" },
    { code: "+233", name: "Ghana", flag: "🇬🇭" },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    phoneNumber: "",
    email: "",
    subject: "",
    comment: "",
    agreedToPolicy: false,
  });

  // State for country dropdown
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const fullPhoneNumber = `${selectedCountry.code}${formData.phoneNumber}`;
    console.log("Form submitted:", {
      ...formData,
      phoneNumber: fullPhoneNumber,
    });
    // Reset form or show success message
  };

  return (
    <>
      <ScrollToTop />
      {/* Hero Section */}
      <section className="bg-[#1E296B] pb-16 md:pb-24 px-4 sm:px-6 md:px-10">
        <motion.div
          className="overflow-hidden rounded-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={heroControls}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="px-3 sm:px-5 md:px-[90px] py-4 md:py-[31px]">
            <Navbar />
          </div>
        </motion.div>

        <div className="container mx-auto max-w-7xl mt-16 md:mt-10">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl hero font-bold text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={heroControls}
            >
              Contact Us
            </motion.h1>

            <motion.p
              className="text-white/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={heroControls}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Have questions or need assistance? Reach out to us! Our dedicated
              team is here to help you with all your inquiries. Whether you're
              looking for product information or support, we're just a message
              away. Let's connect!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="bg-white shadow-xl rounded-lg p-6 md:p-10 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 font-medium"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Phone Number Field with Country Dropdown */}
                <div className="space-y-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-700 font-medium"
                  >
                    Phone number
                  </label>
                  <div className="relative flex" ref={dropdownRef}>
                    {/* Country Dropdown Button */}
                    <div className="relative">
                      <button
                        type="button"
                        className="flex items-center space-x-1 px-3 py-3 border border-gray-300 border-r-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        onClick={() =>
                          setIsCountryDropdownOpen(!isCountryDropdownOpen)
                        }
                      >
                        <span className="flex items-center">
                          {/* <span className="mr-1">{selectedCountry.flag}</span> */}
                          <span className="text-gray-700">
                            {selectedCountry.flag}
                          </span>
                        </span>
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {isCountryDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-[220px] bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                          <ul className="py-1">
                            {countries.map((country) => (
                              <li
                                key={country.code}
                                className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                                  selectedCountry.code === country.code
                                    ? "bg-blue-50"
                                    : ""
                                }`}
                                onClick={() => handleCountrySelect(country)}
                              >
                                <div className="flex items-center">
                                  {/* <span className="mr-2">{country.flag}</span> */}
                                  <span className="text-gray-700">
                                    {country.name}
                                  </span>
                                  <span className="ml-2 text-gray-500">
                                    {country.code}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-medium"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Your subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Comment Field */}
              <div className="space-y-2">
                <label
                  htmlFor="comment"
                  className="block text-gray-700 font-medium"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Write your comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreedToPolicy"
                    name="agreedToPolicy"
                    type="checkbox"
                    checked={formData.agreedToPolicy}
                    onChange={handleChange}
                    className="w-4 h-4 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreedToPolicy" className="text-gray-600">
                    You agree to our friendly{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      privacy policy
                    </a>
                    .
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-4 px-4 bg-[#002366] text-white font-medium rounded-lg hover:bg-[#001a4d] transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Send message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <motion.div
              className="flex items-center space-x-4 shadow-xl rounded-lg p-6 justify-center  border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className=" p-3 rounded-full">
                  <img src="/c1.svg" alt="" />
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  No 2, Amuda Ojere, Iwo Road,
                </p>
                <p className="text-gray-600">Ibadan, Oyo State, Nigeria.</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4 shadow-xl rounded-lg p-6 justify-center  border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className=" p-3 rounded-full">
                  <img src="/c2.svg" alt="" />
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  (+234 ) 704-700-4913
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4 shadow-xl rounded-lg p-6 justify-center  border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className=" p-3 rounded-full">
                  <img src="/c3.svg" alt="" />
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800">Info@bmapurefix.com</p>
              </div>
            </motion.div>
          </div>

          {/* Google Maps Section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
              <div className="h-[450px] w-full relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.303981217954!2d3.9204217!3d7.417516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103993661c26ee15%3A0x36c8c31e5a93ce4c!2sIwo%20Rd%2C%20Iwo%20Road%2C%20Ibadan%2C%20Nigeria!5e0!3m2!1sen!2s!4v1683893333991!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BMA PureFix Location"
                  className="absolute inset-0"
                ></iframe>
              </div>
              {/* <div className="p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Visit Our Location
                </h3>
                <p className="text-gray-600">
                  Come see us in person and discover our full range of products.
                </p>
                <div className="mt-4 flex items-center text-sm text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>
                    Business Hours: Monday - Friday: 8am - 6pm | Saturday: 9am -
                    4pm
                  </p>
                </div>
              </div> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTAsec />

      {/* Footer Section */}
      <Footer />
    </>
  );
};
