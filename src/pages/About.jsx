/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { CTAsec } from "../components/CTAsec";
import { ScrollToTop } from "../components/ScrollToTop";
import { WhatsAppFloat } from "../components/WhatsAppFloat";

export const About = () => {
  const heroControls = useAnimation();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  // State to track if navbar should be sticky
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  // Reference to hero section for intersection observer
  const heroSectionRef = useRef(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Start hero animations immediately
    heroControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });

    // Autoplay audio with user interaction check
    const playAudio = () => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
              setAudioError(true);
            });
        }
      }
    };

    // Try to play audio after a short delay to allow page to load
    const timer = setTimeout(() => {
      playAudio();
    }, 1000);

    return () => {
      clearTimeout(timer);
      // Pause audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
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

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
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
            className="fixed top-0 left-0 right-0 z-50 md:mx-20"
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

      {/* Hero Section with Background Image */}
      <section
        ref={heroSectionRef}
        className="relative h-[60vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/bg-ab.png"
            alt="BMA PureFix Factory"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/ab4.png"; // Fallback image if the main one fails to load
            }}
          />
          {/* Overlay gradient to ensure text readability */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src="/about-voiceover.mp3"
          preload="auto"
          onError={() => setAudioError(true)}
        />

        {/* Navbar */}
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

        {/* Audio Controls */}
        {!audioError && (
          <motion.div
            className="absolute top-5 right-5 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <button
              onClick={toggleAudio}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? "Pause voice over" : "Play voice over"}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          </motion.div>
        )}

        {/* Hero Content */}
        <div className="container relative z-20 mx-auto max-w-[1440px] px-4 text-center">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={heroControls}
          >
            About BMA PureFix
          </motion.h1>

          {/* <motion.p
            className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={heroControls}
            transition={{ delay: 0.2 }}
          >
            Excellence in construction materials, innovation in every grain.
          </motion.p> */}
        </div>
      </section>

      {/* Innovation in Construction Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left Column - Text Content */}
            <motion.div
              className="w-full md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl  bma-heading-2 font-bold text-[#1D1E25] leading-tight mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Innovation in Construction, Excellence in Quality
              </motion.h2>

              <motion.div
                className="space-y-4 text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-base sm:text-lg">
                  At BMA PureFix, we are revolutionizing the way construction
                  professionals approach building materials. As a leading name
                  in the POP cement industry, we provide high-performance
                  solutions tailored to the needs of builders, contractors, and
                  developers.
                </p>

                <p className="text-base sm:text-lg">
                  Our unwavering commitment to quality, innovation, and
                  reliability ensures that every structure built with BMA
                  PureFix stands the test of time.
                </p>

                <p className="text-base sm:text-lg">
                  Whether it's residential, commercial, or large-scale
                  infrastructure, our products are designed to enhance strength,
                  durability, and aesthetic excellence.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="overflow-hidden rounded-lg shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/abn1.png"
                  alt="BMA PureFix Innovation"
                  className="w-full h-auto object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x600/f5f5f5/333333?text=BMA+Innovation";
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-gray-50">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left Column - Image */}
            <motion.div
              className="w-full md:w-1/2 order-1 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="overflow-hidden rounded-lg shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/abn2.png"
                  alt="BMA PureFix Team Members"
                  className="w-full h-auto object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x600/f5f5f5/333333?text=Our+Journey";
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Right Column - Text Content */}
            <motion.div
              className="w-full md:w-1/2 order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl bma-heading-2 font-bold text-[#1D1E25] leading-tight mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our Journey: A Legacy of Excellence
              </motion.h2>

              <motion.div
                className="space-y-4 text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-base sm:text-lg">
                  BMA PureFix was founded with a singular vision: to bridge the
                  gap between advanced material science and real-world
                  construction needs. What began as a small endeavor has grown
                  into a trusted brand known for its cutting-edge solutions.
                </p>

                <p className="text-base sm:text-lg">
                  Over the years, we have expanded our reach, forging strategic
                  partnerships with suppliers, distributors, and industry
                  experts to ensure that our products are available where and
                  when they are needed.
                </p>

                <p className="text-base sm:text-lg">
                  Our journey has been defined by relentless innovation,
                  customer satisfaction, and an ever-evolving commitment to
                  excellence.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Commitment to Excellence Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left Column - Text Content */}
            <motion.div
              className="w-full md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="bma-heading-2 font-bold text-[#1D1E25] leading-tight mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our Commitment to Excellence
              </motion.h2>

              <motion.div
                className="space-y-4 text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-base sm:text-lg">
                  Our reputation is built on an unyielding dedication to
                  delivering the highest quality products. Every batch of BMA
                  PureFix cement undergoes meticulous testing to ensure it meets
                  and exceeds global industry standards.
                </p>

                <p className="text-base sm:text-lg">
                  We invest heavily in research and development, leveraging the
                  latest advancements in material technology to refine our
                  formulations and introduce superior solutions.
                </p>

                <p className="text-base sm:text-lg">
                  This commitment to continuous improvement enables us to
                  provide POP cement that ensures smooth application, enhanced
                  durability, and exceptional performance on every project.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="overflow-hidden rounded-lg shadow-xl relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/ab3.png"
                  alt="BMA PureFix Team Member"
                  className="w-full h-auto object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x600/f5f5f5/333333?text=Our+Commitment";
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Drives Us Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#002171]">
        <div className="container mx-auto max-w-[1440px]">
          {/* Heading and Intro Text */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="bma-heading-2 font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              What Drives Us?
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              At BMA PureFix, we believe that the foundation of great
              construction is great materials. Our core values shape everything
              we do and ensure that we deliver only the best to our customers:
            </motion.p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {/* Card 1: Reliability */}
            <motion.div
              className="bg-[#0A337F] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <span className="inline-block ">
                  <motion.img
                    src="/w1.png"
                    alt="Reliability"
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
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Reliability</h3>
              <p className="text-white/80">
                Our customers count on us for consistent quality and performance
                in every product we produce
              </p>
            </motion.div>

            {/* Card 2: Innovation */}
            <motion.div
              className="bg-[#0A337F] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <span className="inline-block ">
                  <motion.img
                    src="/w2.png"
                    alt="Innovation"
                    className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    viewport={{ once: true }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3e%3cpath fill='%23FFD700' d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z'/%3e%3c/svg%3e";
                    }}
                  />
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
              <p className="text-white/80">
                We stay ahead of industry trends, embracing new technologies to
                improve our offerings
              </p>
            </motion.div>

            {/* Card 3: Sustainability */}
            <motion.div
              className="bg-[#0A337F] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <span className="inline-block ">
                  <motion.img
                    src="/w3.png"
                    alt="Sustainability"
                    className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    viewport={{ once: true }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3e%3cpath fill='%23FFD700' d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z'/%3e%3c/svg%3e";
                    }}
                  />
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Sustainability
              </h3>
              <p className="text-white/80">
                We are dedicated to eco-friendly manufacturing practices,
                minimizing waste and reducing our carbon footprint
              </p>
            </motion.div>

            {/* Card 4: Customer-Centric Approach */}
            <motion.div
              className="bg-[#0A337F] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <span className="inline-block ">
                  <motion.img
                    src="/w4.png"
                    alt="Customer-Centric Approach"
                    className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                    viewport={{ once: true }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3e%3cpath fill='%23FFD700' d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z'/%3e%3c/svg%3e";
                    }}
                  />
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Customer-Centric Approach
              </h3>
              <p className="text-white/80">
                Our clients are at the heart of everything we do. We offer
                expert guidance, tailored solutions, and unparalleled support to
                meet their unique needs
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-black">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col space-y-8">
            {/* Vision Card */}
            <motion.div
              className="bg-[#1A1A1A] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex   flex-col items-start">
                <div className="mr-4 mb-4 mt-1">
                  <motion.img
                    src="/v1.png"
                    alt="Vision"
                    className="sm:w-16 sm:h-16 mb-3 sm:mb-4"
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
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Our Vision: Shaping the Future of Construction
                  </h3>
                  <p className="text-white/80 text-base leading-relaxed">
                    Our vision is to become the global benchmark for
                    high-performance POP cement solutions, recognized for
                    quality, innovation, and sustainability. We aim to set new
                    industry standards by continuously evolving our products and
                    services to meet the dynamic needs of the construction
                    sector.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              className="bg-[#1A1A1A] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex  flex-col items-start">
                <div className="mr-4 mb-4  mt-1">
                  <motion.img
                    src="/v2.png"
                    alt="Mission"
                    className="sm:w-16 sm:h-16 mb-3 sm:mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    viewport={{ once: true }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3e%3cpath fill='%23FFD700' d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z'/%3e%3c/svg%3e";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Our Mission: Empowering Builders with Superior Materials
                  </h3>
                  <p className="text-white/80 text-base leading-relaxed mb-4">
                    At BMA PureFix, our mission is to empower construction
                    professionals by providing premium-grade materials that
                    enhance efficiency, durability, and aesthetic appeal. We are
                    dedicated to ensuring that every project whether big or
                    small benefits from the strength and reliability of our POP
                    cement.
                  </p>
                  <p className="text-white/80 text-base leading-relaxed">
                    Through our commitment to quality, sustainability, and
                    customer satisfaction, we aspire to make a lasting impact on
                    the industry.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Leadership and Certification Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="bma-heading-2 font-bold text-[#1D1E25] leading-tight mb-8">
              Industry Leadership and <br className="hidden md:block" />{" "}
              Certification
            </h2>
            <p className="max-w-4xl mx-auto text-gray-600 text-base sm:text-lg">
              Quality is at the core of everything we do. BMA PureFix operates
              under strict quality control measures, ensuring that our products
              comply with international industry standards. We hold
              certifications that reflect our dedication to best practices in
              manufacturing and sustainability.
            </p>
            <p className="max-w-4xl mx-auto text-gray-600 text-base sm:text-lg mt-4">
              By adhering to global benchmarks, we guarantee that every bag of
              BMA PureFix cement delivers the consistency and durability that
              professionals expect.
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg overflow-hidden shadow-lg mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/ab4.png"
              alt="BMA PureFix Team Members with Products"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/1200x600/f5f5f5/333333?text=Industry+Leadership";
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Building the Future Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-gray-50">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Left Column - Text Content */}
            <motion.div
              className="w-full md:w-1/2 order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="bma-heading-2 font-bold text-[#1D1E25] leading-tight mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Building the Future,
                <br />
                One Project at a Time
              </motion.h2>

              <motion.div
                className="space-y-4 text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-base sm:text-lg">
                  Whether you're working on a home renovation, a commercial
                  complex, or a large-scale infrastructure project, BMA PureFix
                  is your trusted partner for superior construction materials.
                  As we continue to push the boundaries of innovation and
                  quality, we remain committed to delivering solutions that
                  redefine durability, performance, and aesthetic excellence.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="overflow-hidden rounded-lg shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/ab5.png"
                  alt="BMA PureFix Products"
                  className="w-full h-auto object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x600/f5f5f5/333333?text=BMA+Products";
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our CEO Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#1E296B]">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Left Column - Heading and CEO Image */}
            <div className="w-full md:w-1/2 space-y-8">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Meet Our CEO
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="/ceo.png"
                  alt="Bello Michael - CEO of BMA PureFix"
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x600/f5f5f5/333333?text=CEO+Portrait";
                  }}
                />
              </motion.div>
            </div>

            {/* Right Column - CEO Info */}
            <motion.div
              className="w-full md:w-1/2 text-white"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Bello Michael
              </motion.h3>

              <motion.p
                className="text-white/80 text-xl mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                MD, CEO
              </motion.p>

              <motion.p
                className="text-white/80 text-lg font-medium mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Engineering Strength, Cementing Success, Building Futures
              </motion.p>

              <motion.p
                className="text-white/70 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                With over 20 years of experience in the construction materials
                industry, John leads our company with a vision for innovation
                and excellence. His strategic leadership has been instrumental
                in establishing BMA PureFix as a market leader.
              </motion.p>

              <motion.p
                className="text-white/70 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Together, our team is committed to pushing the boundaries of
                innovation and quality, ensuring that every product we deliver
                meets the highest standards of performance and reliability.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      {/* <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-white">
        <div className="container mx-auto max-w-[1440px]">
        
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="bma-heading-2 font-bold text-[#1D1E25] leading-tight mb-6">
              Meet Our Team:
              <br />
              Experts Behind the Innovation
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-4xl">
              At BMA PureFix, our success is driven by a team of industry
              professionals who bring expertise, innovation, and dedication to
              every aspect of our operations. Our leadership team consists of
              experienced professionals with a deep understanding of
              construction materials, manufacturing processes, and customer
              needs. With a shared vision of excellence, they work tirelessly to
              ensure that BMA PureFix remains at the forefront of the industry.
            </p>
          </motion.div>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            <motion.div
              className="bg-white rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-w-1 aspect-h-1 mb-5">
                <img
                  src="/m1.png"
                  alt="Rakabuming Suhu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x400/f5f5f5/333333?text=Team+Member";
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-[#1D1E25] mb-1">
                Rakabuming Suhu
              </h3>
              <p className="text-gray-500 mb-3">Founder, CTO</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                With over 20 years of experience in the construction materials
                industry, Bello Michael leads our company with a vision for
                innovation and excellence. His strategic leadership has been
                instrumental in establishing BMA PureFix as a market leader.
              </p>
            </motion.div>

           
            <motion.div
              className="bg-white rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-w-1 aspect-h-1 mb-5">
                <img
                  src="/m2.png"
                  alt="Jessica Aduhai"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x400/f5f5f5/333333?text=Team+Member";
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-[#1D1E25] mb-1">
                Jessica Aduhai
              </h3>
              <p className="text-gray-500 mb-3">SEO Master</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Michael oversees our manufacturing processes with a keen eye for
                efficiency and quality control. His background in industrial
                engineering ensures that every batch of BMA PureFix meets our
                rigorous standards.
              </p>
            </motion.div>

           
            <motion.div
              className="bg-white rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="aspect-w-1 aspect-h-1 mb-5">
                <img
                  src="/m3.png"
                  alt="Azalea Perumahan"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x400/f5f5f5/333333?text=Team+Member";
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-[#1D1E25] mb-1">
                Azalea Perumahan
              </h3>
              <p className="text-gray-500 mb-3">Account Executive</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sarah brings 15 years of expertise in material science and
                product development. Her innovative approach has led to
                breakthrough formulations that have set new standards for
                performance and durability in the industry.
              </p>
            </motion.div>
          </div>

         
          <motion.p
            className="text-gray-600 text-base sm:text-lg mt-12 text-left  mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Together, our team is committed to pushing the boundaries of
            innovation and quality, ensuring that every product we deliver meets
            the highest standards of performance and reliability.
          </motion.p>
        </div>
      </section> */}
      {/* CTA Section */}
      <CTAsec />
      {/* Footer */}
      <Footer />
    </>
  );
};
