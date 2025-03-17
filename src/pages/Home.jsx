/* eslint-disable react-hooks/exhaustive-deps */
import { Navbar } from "../components/Navbar";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Footer } from "../components/Footer";
import { CTAsec } from "../components/CTAsec";
import { FAQ } from "../components/FAQ";
import { useEffect, useRef, useState } from "react";
import { ScrollToTop } from "../components/ScrollToTop";
import { WhatsAppFloat } from "../components/WhatsAppFloat";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  // Animation controls
  const heroControls = useAnimation();
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showMuteIndicator, setShowMuteIndicator] = useState(false);
  // State to track if navbar should be sticky
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  // Reference to hero section for intersection observer
  const heroSectionRef = useRef(null);

  // Reference to product section for smooth scrolling
  const productSectionRef = useRef(null);

  //Navigateion
  const navigate = useNavigate();

  // Scroll to top on page load and handle video playback
  useEffect(() => {
    window.scrollTo(0, 0);

    // Start hero animations immediately
    heroControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });

    // Function to play video with error handling
    const playVideo = () => {
      if (videoRef.current) {
        // Make sure video is muted to allow autoplay in most browsers
        videoRef.current.muted = true;

        const playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Video playback started successfully");
            })
            .catch((error) => {
              console.error("Video playback failed:", error);
              setVideoError(true);
            });
        }
      }
    };

    // Try to play video after a short delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      playVideo();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [heroControls]);

  // Set up intersection observer to detect when hero section is out of viewport
  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // trigger when 10% of the hero is visible
    };

    const handleIntersection = (entries) => {
      // When hero section is not intersecting (out of view), make navbar sticky
      const [entry] = entries;
      setIsNavbarSticky(!entry.isIntersecting);
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => {
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current);
      }
    };
  }, []);

  // Handle video error
  const handleVideoError = () => {
    console.log("Video failed to load, using fallback image");
    setVideoError(true);
  };

  // Smooth scroll to product section
  const scrollToProductSection = () => {
    productSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Toggle video mute status
  const toggleMute = (e) => {
    // Prevent default behavior
    e.preventDefault();

    // Avoid toggle when clicking on navigation, buttons, or scroll indicator
    if (
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest('[role="button"]')
    ) {
      return;
    }

    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);

      // Show mute indicator for a short time
      setShowMuteIndicator(true);
      setTimeout(() => {
        setShowMuteIndicator(false);
      }, 1500);
    }
  };

  return (
    <>
      <ScrollToTop />
      <WhatsAppFloat />

      {/* Sticky Navbar - Only visible when scrolled past hero section */}
      <AnimatePresence>
        {isNavbarSticky && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50  md:mx-20 "
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 sm:px-6 md:px-10">
              <Navbar isSticky={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Video Background */}
      <section
        ref={heroSectionRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        onClick={toggleMute}
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="/img.png" // Fallback image while video loads
              onError={handleVideoError}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src="/img.png"
              alt="BMA PureFix Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Overlay gradient to ensure text readability */}
          <div className="absolute inset-0 bg-black/70 bg-opacity-60 z-10"></div>
        </div>

        {/* Mute/Unmute Indicator */}
        {showMuteIndicator && !videoError && (
          <motion.div
            className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm p-6 rounded-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  clipRule="evenodd"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </motion.div>
        )}

        {/* Small Mute Indicator (always visible) */}
        {!videoError && (
          <motion.div
            className="absolute z-30 bottom-5 right-5 bg-black/30 backdrop-blur-sm p-2 rounded-full hover:bg-black/50 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            title={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  clipRule="evenodd"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </motion.div>
        )}

        {/* Navbar in Hero Section */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10"
          initial={{ opacity: 0, y: -30 }}
          animate={heroControls}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="container mx-auto max-w-[1440px] px-3 sm:px-5 md:px-[90px] py-4 md:py-[31px]">
            <Navbar isSticky={false} />
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-20 relative text-center mt-16">
          <motion.h1
            className="text-white md:w-[85%] mx-auto px-2 sm:px-[9px] text-center text-3xl md:text-5xl lg:text-7xl hero font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={heroControls}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Build Stronger, Build Smarter with BMA PureFix.
          </motion.h1>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-10 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroControls}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="flex items-center bg-[#0A337F] rounded-full px-6 py-3 cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "#0D47A1" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => navigate("/contact")}
            >
              <img
                src="/delivery.svg"
                alt="Fast Delivery"
                className="w-6 h-6 mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath fill='%23FFFFFF' d='M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z'/%3e%3cpath fill='%23FFFFFF' d='M5 6h5v2H5zm14 7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'/%3e%3c/svg%3e";
                }}
              />
              <span className="text-white font-medium">Fast Delivery</span>
            </motion.div>

            <motion.div
              className="flex items-center bg-[#0A337F] rounded-full px-6 py-3 cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "#0D47A1" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => navigate("/contact")}
            >
              <img
                src="/call-love.svg"
                alt="24/7 Support"
                className="w-6 h-6 mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath fill='%23FFFFFF' d='M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z'/%3e%3c/svg%3e";
                }}
              />
              <span className="text-white font-medium">24/7 Support</span>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute mt-5 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            whileHover="hover"
            onClick={scrollToProductSection}
            aria-label="Scroll to next section"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                scrollToProductSection();
              }
            }}
          >
            <div className="flex flex-col items-end md:items-center">
              <motion.div
                className="relative w-8 h-14 rounded-full border border-white mb-2 flex items-start justify-center"
                variants={{
                  hover: {
                    borderColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
                  },
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-white rounded-full absolute top-2"
                  initial={{ y: 0 }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                  variants={{
                    hover: {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      scale: 1.2,
                      boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
                    },
                  }}
                />
              </motion.div>
              <span className="text-white text-sm font-light">Scroll</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Information Section */}
      <section
        ref={productSectionRef}
        className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-white"
      >
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div
              className="w-full md:flex-1 space-y-4 sm:space-y-6 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl bma-heading-2 font-bold text-[#1D1E25] leading-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Stronger, Smoother, <br className="hidden sm:block" /> Smarter
                POP Cement
              </motion.h2>

              <motion.p
                className="text-gray-600 text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                BMA PureFix isn't just POP cement, it's a game-changer for
                builders, contractors, and developers. Engineered for unmatched
                strength, durability, and precision, it ensures flawless
                finishes and lasting results.
              </motion.p>

              <motion.p
                className="text-gray-600 text-base sm:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Whether you're sculpting intricate details or reinforcing
                structural components, BMA PureFix delivers exceptional quality
                every time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="pt-2 sm:pt-4"
              >
                <motion.button
                  className="bg-[#1E296B] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-[#151E4B] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/about")}
                >
                  Read more
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full md:flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <img
                src="/img2.png"
                alt="BMA PureFix Product Display"
                className="w-full h-auto rounded-lg shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/600x400/1E296B/FFFFFF?text=BMA+PureFix";
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Partner Section */}
      <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-gray-50">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-8 md:mb-0">
            {/* Left Column - Heading */}
            <motion.div
              className="w-full md:w-1/2 sm:mb-6 md:mb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl bma-heading-2 font-bold text-[#1D1E25] leading-tight sm:mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Your Global Partner for High-Performance{" "}
                <br className="hidden md:block" /> Cement
              </motion.h2>
            </motion.div>

            {/* Right Column - Description */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-6">
                No matter where your project is, you need reliable, top-quality
                cement delivered on time and within budget. BMA PureFix offers a
                comprehensive range of solutions, backed by expert support to
                ensure flawless project execution.
              </p>
            </motion.div>
          </div>

          {/* Feature Cards Grid - Responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
            {/* Card 1 - Guaranteed Quality */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.img
                src="/g1.png"
                alt="Quality Shield"
                className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3e%3cpath fill='%23FFD700' d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z'/%3e%3c/svg%3e";
                }}
              />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                Guaranteed Quality
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Every batch meets global standards.
              </p>
            </motion.div>

            {/* Card 2 - Reliable Supply */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.img
                src="/g2.png"
                alt="Supply Chain"
                className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3e%3cpath fill='%234299E1' d='M20 8h-3V6c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-5 0H9V6h6v2z'/%3e%3c/svg%3e";
                }}
              />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                Reliable Supply
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Strong supplier relationships ensure uninterrupted deliveries.
              </p>
            </motion.div>

            {/* Card 3 - Cost-Effective */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.img
                src="/g3.png"
                alt="Cost Effective"
                className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                viewport={{ once: true }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3e%3cpath fill='%2338A169' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'/%3e%3c/svg%3e";
                }}
              />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                Cost-Effective
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Premium quality at competitive pricing.
              </p>
            </motion.div>

            {/* Card 4 - Global Reach */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.img
                src="/g4.png"
                alt="Global Reach"
                className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3e%3cpath fill='%234299E1' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z M17.9 17.39c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3e%3c/svg%3e";
                }}
              />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                Global Reach
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Seamless distribution, wherever you build.
              </p>
            </motion.div>

            {/* Card 5 - Expert Support */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm flex flex-col sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.img
                src="/g5.png"
                alt="Expert Support"
                className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                viewport={{ once: true }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3e%3cpath fill='%23F6AD55' d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3e%3c/svg%3e";
                }}
              />
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                Expert Support
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We help you achieve the best results.
              </p>
            </motion.div>
          </div>

          {/* Mobile Connect with us button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
            className="mt-16 text-left "
          >
            <motion.button
              className="bg-[#0E1853] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1E296B] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
            >
              Connect with us
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Bridging Global Quality Section */}
      <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            {/* Left Column - Heading and Features */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl bma-heading-2 font-bold text-[#1D1E25] leading-tight sm:mb-8 md:mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Bridging Global Quality with Local Expertise
              </motion.h2>
            </motion.div>

            {/* Right Column - Description and Image */}
            <motion.div
              className="w-full md:w-1/2 sm:mt-6 md:mt-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.p
                className="text-gray-600 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                At BMA PureFix, we understand that every construction project is
                unique. That's why we provide tailored solutions—whether you're
                a local contractor or managing a large-scale international
                project. Our extensive distribution network ensures that you get
                the right materials, at the right time, every time.
              </motion.p>
            </motion.div>
          </div>
          <div className="sm:grid flex flex-col-reverse sm:grid-cols-2 mt-8 sm:mt-10 gap-6 sm:gap-8">
            <div>
              <div className="space-y-6 sm:space-y-8">
                {/* Feature 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Custom Packaging Solutions
                  </h3>
                  <p className="text-gray-500">
                    Tailored for local and international markets
                  </p>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Strong Local & Global Partnerships
                  </h3>
                  <p className="text-gray-500">Trusted by builders worldwide</p>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Reliable Logistics Network
                  </h3>
                  <p className="text-gray-500">Never worry about delays.</p>
                </motion.div>

                {/* Feature 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Sustainability-Focused
                  </h3>
                  <p className="text-gray-500">
                    Eco-friendly and responsible manufacturing.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <motion.button
                  className="bg-[#0E1853] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1E296B] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/contact")}
                >
                  Talk to us
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              className="w-full h-[350px] md:h-[400px] overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <img
                src="/img.png"
                alt="BMA PureFix Team"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/800x450/1E296B/FFFFFF?text=BMA+PureFix+Team";
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* On-Time Delivery Section */}
      <section className="bg-[#001756] py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10">
        <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left Column - Image */}
            <motion.div
              className="w-full md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="relative overflow-hidden rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/img3.png"
                  alt="BMA PureFix Customer Service"
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/600x500/001756/FFFFFF?text=BMA+PureFix+Team";
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              className="w-full md:w-1/2 text-white"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl bma-heading-2 text-white mb-4 sm:mb-6"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                On-Time, Every Time
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg bma-body-large mb-6 sm:mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                BMA PureFix has built a network of trusted logistics partners to
                ensure a smooth, uninterrupted supply chain. Our customers enjoy
                reliable, on-time delivery no matter the scale of the project.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="bg-white text-[#001756] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/about")}
                >
                  Read more
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section
        id="products"
        className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-gray-50"
      >
        <div className="container mx-auto max-w-[1440px]">
          {/* Heading Area */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
            {/* Left - Main Heading */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="bma-heading-1 text-[#1D1E25] mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                POP Cement for Every Construction Need
              </motion.h2>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              className="md:w-2/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="bma-body-large text-gray-600">
                BMA PureFix offers a diverse range of POP cement designed for
                strength, efficiency, and precision. Whatever your project, we
                have the right solution.
              </p>
            </motion.div>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Product Card 1 - POP Cement */}
            <motion.div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="p-6">
                <div className="h-64 flex items-center justify-center bg-[#EDEDED] rounded-lg mb-6">
                  <motion.img
                    src="/p2.png"
                    alt="POP Cement Bag"
                    className="max-h-full max-w-full w-full object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x350/f0f0f0/1E296B?text=POP+Cement";
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  GYPSUM Plaster
                </h3>
                <p className="text-gray-600 mb-4">
                  BMA PureFix (Plaster of Paris)
                </p>
                <motion.button
                  className="bg-[#001756] text-white px-5 py-2 rounded-full font-medium hover:bg-[#1E296B] transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/products")}
                >
                  See details
                </motion.button>
              </div>
            </motion.div>

            {/* Product Card 2 - POP Cement */}
            <motion.div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="p-6">
                <div className="h-64 flex items-center justify-center bg-[#EDEDED] rounded-lg mb-6">
                  <motion.img
                    src="/pop.png"
                    alt="POP Cement Bag"
                    className="max-h-full max-w-full w-full object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x350/f0f0f0/1E296B?text=POP+Cement";
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  POP Cement
                </h3>
                <p className="text-gray-600 mb-4">
                  BMA PureFix (Plaster of Paris)
                </p>
                <motion.button
                  className="bg-[#001756] text-white px-5 py-2 rounded-full font-medium hover:bg-[#1E296B] transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/products")}
                >
                  See details
                </motion.button>
              </div>
            </motion.div>

            {/* Product Card 3 - Bond */}
            <motion.div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="p-6">
                <div className="h-64 flex items-center justify-center bg-[#EDEDED]  rounded-lg mb-6">
                  <motion.img
                    src="/bond1.png"
                    alt="Bond Container"
                    className="max-h-full max-w-full object-contain p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x350/f0f0f0/1E296B?text=Bond";
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Bond</h3>
                <p className="text-gray-600 mb-4">BMA PureFix</p>
                <motion.button
                  className="bg-[#001756] text-white px-5 py-2 rounded-full font-medium hover:bg-[#1E296B] transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/products")}
                >
                  See details
                </motion.button>
              </div>
            </motion.div>

            {/* Product Card 4 - Screeding Paint */}
            <motion.div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="p-6">
                <div className="h-64 flex items-center justify-center bg-[#EDEDED] rounded-lg mb-6">
                  <motion.img
                    src="/bond2.png"
                    alt="Screeding Paint"
                    className="max-h-full max-w-full object-contain p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x350/f0f0f0/1E296B?text=Screeding+Paint";
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  Screeding Paint
                </h3>
                <p className="text-gray-600 mb-4">BMA PureFix</p>
                <motion.button
                  className="bg-[#001756] text-white px-5 py-2 rounded-full font-medium hover:bg-[#1E296B] transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/products")}
                >
                  See details
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">
        <div className="container mx-auto max-w-[1440px]">
          {/* Section Heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="bma-heading-2 text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Testimonials
            </motion.h2>
            <motion.p
              className="bma-body text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              What Our Customers Say
            </motion.p>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial Card 1 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="/user1.png"
                  alt="Eucharia Adams"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/48/1E296B/FFFFFF?text=EA";
                  }}
                />
                <div>
                  <h3 className="font-bold text-gray-900">Eucharia Adams</h3>
                  <p className="text-gray-600 text-sm">Building Contractor</p>
                </div>
              </div>

              {/* <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-700 font-medium">5.0</span>
              </div> */}

              <p className="text-gray-600 mb-4">
                "BMA PureFix has transformed how our team completes projects.
                The consistency and workability of this POP cement is
                outstanding. Our ceiling designs now have a flawless finish that
                our clients consistently praise."
              </p>

              <div className="absolute top-6 right-6 text-4xl text-gray-300 font-serif">
                <svg
                  width="40"
                  height="32"
                  viewBox="0 0 40 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M38.4186 0.465332V2.7444C35.1938 3.9227 32.6667 5.78316 30.8372 8.3258C29.0078 10.8374 28.093 13.4576 28.093 16.1863C28.093 16.7754 28.186 17.2095 28.3721 17.4886C28.4961 17.6746 28.6357 17.7677 28.7907 17.7677C28.9457 17.7677 29.1783 17.6591 29.4884 17.4421C30.4806 16.7289 31.7364 16.3723 33.2558 16.3723C35.0233 16.3723 36.5891 17.101 37.9535 18.5584C39.3178 19.9847 40 21.6901 40 23.6746C40 25.7522 39.2093 27.5816 37.6279 29.163C36.0775 30.7444 34.186 31.5351 31.9535 31.5351C29.3488 31.5351 27.1008 30.4653 25.2093 28.3258C23.3178 26.1863 22.3721 23.318 22.3721 19.7211C22.3721 15.5351 23.6589 11.7832 26.2326 8.46533C28.8062 5.1475 32.8682 2.48084 38.4186 0.465332ZM16.0465 0.465332V2.7444C12.8217 3.9227 10.2946 5.78316 8.46512 8.3258C6.63566 10.8374 5.72093 13.4576 5.72093 16.1863C5.72093 16.7754 5.81395 17.2095 6 17.4886C6.12403 17.6746 6.26357 17.7677 6.4186 17.7677C6.57364 17.7677 6.8062 17.6591 7.11628 17.4421C8.10853 16.7289 9.36434 16.3723 10.8837 16.3723C12.6512 16.3723 14.2171 17.101 15.5814 18.5584C16.9457 19.9847 17.6279 21.6901 17.6279 23.6746C17.6279 25.7522 16.8372 27.5816 15.2558 29.163C13.7054 30.7444 11.814 31.5351 9.5814 31.5351C6.97674 31.5351 4.72868 30.4653 2.83721 28.3258C0.945736 26.1863 0 23.318 0 19.7211C0 15.5351 1.28682 11.7832 3.86047 8.46533C6.43411 5.1475 10.4961 2.48084 16.0465 0.465332Z"
                    fill="#1D1E25"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Testimonial Card 2 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="/indian.jpg"
                  alt="Anurag Pandey"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/48/1E296B/FFFFFF?text=DJ";
                  }}
                />
                <div>
                  <h3 className="font-bold text-gray-900">Anurag Pandey</h3>
                  <p className="text-gray-600 text-sm">Interior Designer</p>
                </div>
              </div>

              {/* <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-700 font-medium">5.0</span>
              </div> */}

              <p className="text-gray-600 mb-4">
                "The durability of BMA PureFix is remarkable. I've used many
                brands over the years, but this one sets a new standard. It
                dries quickly yet gives plenty of working time for detailed
                designs. My clients are always impressed with the results."
              </p>

              <div className="absolute top-6 right-6 text-4xl text-gray-300 font-serif">
                <svg
                  width="40"
                  height="32"
                  viewBox="0 0 40 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M38.4186 0.465332V2.7444C35.1938 3.9227 32.6667 5.78316 30.8372 8.3258C29.0078 10.8374 28.093 13.4576 28.093 16.1863C28.093 16.7754 28.186 17.2095 28.3721 17.4886C28.4961 17.6746 28.6357 17.7677 28.7907 17.7677C28.9457 17.7677 29.1783 17.6591 29.4884 17.4421C30.4806 16.7289 31.7364 16.3723 33.2558 16.3723C35.0233 16.3723 36.5891 17.101 37.9535 18.5584C39.3178 19.9847 40 21.6901 40 23.6746C40 25.7522 39.2093 27.5816 37.6279 29.163C36.0775 30.7444 34.186 31.5351 31.9535 31.5351C29.3488 31.5351 27.1008 30.4653 25.2093 28.3258C23.3178 26.1863 22.3721 23.318 22.3721 19.7211C22.3721 15.5351 23.6589 11.7832 26.2326 8.46533C28.8062 5.1475 32.8682 2.48084 38.4186 0.465332ZM16.0465 0.465332V2.7444C12.8217 3.9227 10.2946 5.78316 8.46512 8.3258C6.63566 10.8374 5.72093 13.4576 5.72093 16.1863C5.72093 16.7754 5.81395 17.2095 6 17.4886C6.12403 17.6746 6.26357 17.7677 6.4186 17.7677C6.57364 17.7677 6.8062 17.6591 7.11628 17.4421C8.10853 16.7289 9.36434 16.3723 10.8837 16.3723C12.6512 16.3723 14.2171 17.101 15.5814 18.5584C16.9457 19.9847 17.6279 21.6901 17.6279 23.6746C17.6279 25.7522 16.8372 27.5816 15.2558 29.163C13.7054 30.7444 11.814 31.5351 9.5814 31.5351C6.97674 31.5351 4.72868 30.4653 2.83721 28.3258C0.945736 26.1863 0 23.318 0 19.7211C0 15.5351 1.28682 11.7832 3.86047 8.46533C6.43411 5.1475 10.4961 2.48084 16.0465 0.465332Z"
                    fill="#1D1E25"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Testimonial Card 3 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="/user3.png"
                  alt="John Bamidele"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/48/1E296B/FFFFFF?text=JB";
                  }}
                />
                <div>
                  <h3 className="font-bold text-gray-900">John Bamidele</h3>
                  <p className="text-gray-600 text-sm">Real Estate Developer</p>
                </div>
              </div>

              {/* <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-700 font-medium">5.0</span>
              </div> */}

              <p className="text-gray-600 mb-4">
                "We've standardized BMA PureFix across all our development
                projects. The consistency between batches is exceptional, and it
                significantly reduces our project timelines while maintaining
                the highest quality. It's cost-effective and delivers superior
                results."
              </p>

              <div className="absolute top-6 right-6 text-4xl text-gray-300 font-serif">
                <svg
                  width="40"
                  height="32"
                  viewBox="0 0 40 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M38.4186 0.465332V2.7444C35.1938 3.9227 32.6667 5.78316 30.8372 8.3258C29.0078 10.8374 28.093 13.4576 28.093 16.1863C28.093 16.7754 28.186 17.2095 28.3721 17.4886C28.4961 17.6746 28.6357 17.7677 28.7907 17.7677C28.9457 17.7677 29.1783 17.6591 29.4884 17.4421C30.4806 16.7289 31.7364 16.3723 33.2558 16.3723C35.0233 16.3723 36.5891 17.101 37.9535 18.5584C39.3178 19.9847 40 21.6901 40 23.6746C40 25.7522 39.2093 27.5816 37.6279 29.163C36.0775 30.7444 34.186 31.5351 31.9535 31.5351C29.3488 31.5351 27.1008 30.4653 25.2093 28.3258C23.3178 26.1863 22.3721 23.318 22.3721 19.7211C22.3721 15.5351 23.6589 11.7832 26.2326 8.46533C28.8062 5.1475 32.8682 2.48084 38.4186 0.465332ZM16.0465 0.465332V2.7444C12.8217 3.9227 10.2946 5.78316 8.46512 8.3258C6.63566 10.8374 5.72093 13.4576 5.72093 16.1863C5.72093 16.7754 5.81395 17.2095 6 17.4886C6.12403 17.6746 6.26357 17.7677 6.4186 17.7677C6.57364 17.7677 6.8062 17.6591 7.11628 17.4421C8.10853 16.7289 9.36434 16.3723 10.8837 16.3723C12.6512 16.3723 14.2171 17.101 15.5814 18.5584C16.9457 19.9847 17.6279 21.6901 17.6279 23.6746C17.6279 25.7522 16.8372 27.5816 15.2558 29.163C13.7054 30.7444 11.814 31.5351 9.5814 31.5351C6.97674 31.5351 4.72868 30.4653 2.83721 28.3258C0.945736 26.1863 0 23.318 0 19.7211C0 15.5351 1.28682 11.7832 3.86047 8.46533C6.43411 5.1475 10.4961 2.48084 16.0465 0.465332Z"
                    fill="#1D1E25"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTAsec />

      {/* Footer */}
      <Footer />
    </>
  );
};
