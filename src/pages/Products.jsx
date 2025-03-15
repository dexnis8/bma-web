// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CTAsec } from "../components/CTAsec";
import { useEffect, useRef, useState } from "react";
import { ScrollToTop } from "../components/ScrollToTop";

export const Products = () => {
  // Animation controls
  const heroControls = useAnimation();

  // State to track if navbar should be sticky
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  // Reference to hero section for intersection observer
  const heroSectionRef = useRef(null);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(heroSectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <ScrollToTop />

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

      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="bg-[#1E296B] pb-16 md:pb-24 px-4 sm:px-6 md:px-10 relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/gridlines.png"
            alt="BMA PureFix Products"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/bg-blue.png"; // Fallback image
            }}
          />
          {/* Overlay gradient to ensure text readability */}
          {/* <div className="absolute inset-0 bg-[#1E296B]/60"></div> */}
        </div>

        <motion.div
          className="overflow-hidden rounded-lg relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={heroControls}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="container mx-auto max-w-[1440px] px-3 sm:px-5 md:px-[90px] py-4 md:py-[31px]">
            <Navbar isSticky={false} />
          </div>
        </motion.div>

        <div className="container mx-auto max-w-[1440px] mt-16 md:mt-10 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h1
              className=" hero font-bold text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={heroControls}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              BMA PureFix Products
            </motion.h1>

            <motion.p
              className="text-white/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={heroControls}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              At BMA PureFix, we offer a range of premium construction materials
              designed to deliver exceptional performance, durability, and ease
              of use. Our products are meticulously formulated to meet the
              highest industry standards, ensuring superior results for every
              project.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={heroControls}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div
                className="flex items-center bg-[#0A337F] rounded-full px-6 py-3 cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: "#0D47A1" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
          </div>
        </div>
      </section>

      {/* Product Showcase Section 1 */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-white">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-16">
            {/* Product Information */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="bma-heading-2 font-bold text-[#1D1E25] mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                BMA Plaster of Paris
                <br />
                (POP Cement)
              </motion.h2>

              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                High-performance plaster for versatile applications.
              </motion.p>

              <motion.div
                className="text-gray-600 space-y-4 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p>
                  BMA Plaster of Paris (POP Cement) is a high-performance
                  gypsum-based plaster, finely milled from calcium sulfate
                  hemihydrate. Engineered for versatility, it offers superior
                  bonding, quick-setting properties, and a flawless finish for a
                  variety of construction and design applications.
                </p>

                <p>
                  Whether used for wall coatings, molding, or decorative
                  features, BMA POP Cement delivers unmatched quality and ease
                  of application. Its formulation is designed to withstand
                  environmental factors while maintaining its strength and
                  smooth finish over time.
                </p>
              </motion.div>

              <motion.button
                className="flex items-center cursor-pointer bg-[#0E1853] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1E296B] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Buy Now
              </motion.button>
            </motion.div>

            {/* Product Image */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className=""
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/p1.png"
                  alt="BMA Plaster of Paris Product"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x600/1E296B/FFFFFF?text=BMA+POP+Cement";
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Features and Usage Section */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Features & Benefits */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-[#1D1E25] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Features & Benefits
              </motion.h3>

              <div className="space-y-6">
                {/* Feature 1 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Surface Smoothing
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Effectively covers imperfections, cracks, and rough
                      patches.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Strong Adhesion</h4>
                    <p className="text-gray-600 text-sm">
                      Bonds well to a variety of surfaces, ensuring long-lasting
                      results.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Weatherproof</h4>
                    <p className="text-gray-600 text-sm">
                      Resistant to moisture, heat, and environmental factors.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 4 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Fast Drying</h4>
                    <p className="text-gray-600 text-sm">
                      Enables quick project completion with minimal downtime.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 5 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Versatile Application
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Suitable for interior and exterior surfaces, including
                      walls, floors, and ceilings.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 6 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Enhanced Durability
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Achieve a professional-grade, smooth, and refined finish
                      every time.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 7 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Eco-Friendly Composition
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Maintains its quality and appearance over time, reducing
                      the need for frequent touch-ups
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* How to Use */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-[#1D1E25] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                How to Use
              </motion.h3>

              <div className="space-y-6">
                {/* Step 1 */}
                <motion.div
                  className="border-l-4 border-[#04276B] pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    Surface Preparation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Ensure the surface or mold is clean and dry before
                    application.
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  className="border-l-4 border-[#04276B] pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    Primer Application
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Use a clean container and mix in a 2:1 ratio of plaster to
                    water. Stir thoroughly until you achieve a uniform
                    consistency.
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  className="border-l-4 border-[#04276B] pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Application</h4>
                  <p className="text-gray-600 text-sm">
                    Use a roller or brush to apply BMA Screeding Paint evenly
                    across the surface.
                  </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  className="border-l-4 border-[#04276B] pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Drying Time</h4>
                  <p className="text-gray-600 text-sm">
                    Allow sufficient drying time between coats as per
                    manufacturer guidelines.
                  </p>
                </motion.div>

                {/* Step 5 */}
                <motion.div
                  className="border-l-4 border-[#04276B] pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Finishing</h4>
                  <p className="text-gray-600 text-sm">
                    Light sanding may be required for a perfectly smooth finish.
                  </p>
                </motion.div>

                {/* Step 6 */}
                <motion.div
                  className="border-l-4 border-[#04276B] pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Storage</h4>
                  <p className="text-gray-600 text-sm">
                    Made with sustainable materials that minimize environmental
                    impact while maintaining high quality.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section 2 - BMA Bond */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-gray-50">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-16">
            {/* Product Image */}
            <motion.div
              className="w-full lg:w-1/2 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className=""
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/p2.png"
                  alt="BMA Bond - High-Performance Adhesive"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x600/1E296B/FFFFFF?text=BMA+Bond";
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Product Information */}
            <motion.div
              className="w-full lg:w-1/2 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="bma-heading-2 font-bold text-[#1D1E25] mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                GYPSUM Plaster
              </motion.h2>

              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                High-performance gypsum-based plaster for versatile
                applications.
              </motion.p>

              <motion.div
                className="text-gray-600 space-y-4 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p>
                  BMA Plaster of Paris (POP Cement) is a high-performance
                  gypsum-based plaster, finely milled from calcium sulfate
                  hemihydrate. Engineered for versatility, it offers superior
                  bonding, quick-setting properties, and a flawless finish for a
                  variety of construction and design applications.
                </p>

                <p>
                  Whether used for wall coatings, molding, or decorative
                  features, BMA POP Cement delivers unmatched quality and ease
                  of application. Its formulation is designed to withstand
                  environmental factors while maintaining its strength and
                  smooth finish over time.
                </p>
              </motion.div>

              <motion.button
                className="flex items-center cursor-pointer bg-[#0E1853] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1E296B] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Buy Now
              </motion.button>
            </motion.div>
          </div>

          {/* Features and Usage Section */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Features & Benefits */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-[#1D1E25] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Features & Benefits
              </motion.h3>

              <div className="space-y-6">
                {/* Feature 1 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">No Cracking</h4>
                    <p className="text-gray-600 text-sm">
                      Specially formulated to prevent shrinkage and cracking,
                      ensuring a smooth and long-lasting finish.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Versatile Applications
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Ideal for precast moldings, decorative plasterwork,
                      ceiling designs, and cornices.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">High Strength</h4>
                    <p className="text-gray-600 text-sm">
                      Provides excellent structural integrity, enhancing the
                      durability of your projects.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 4 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Quick Drying</h4>
                    <p className="text-gray-600 text-sm">
                      Reduces waiting time for project completion without
                      compromising quality.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 5 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Ease of Use</h4>
                    <p className="text-gray-600 text-sm">
                      Simple mixing and application process makes it suitable
                      for professionals and DIY enthusiasts alike.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 6 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Perfect Finish</h4>
                    <p className="text-gray-600 text-sm">
                      Achieve a professional-grade, smooth, and refined finish
                      every time.
                    </p>
                  </div>
                </motion.div>
                {/* Feature 7 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Eco-Friendly Composition
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Made with sustainable materials that minimize
                      environmental impact while maintaining high quality.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* How to Use */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-[#1D1E25] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                How to Use
              </motion.h3>

              <div className="space-y-6">
                {/* Step 1 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    Surface Preparation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Ensure the surface or mold is clean and dry before
                    application.
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Mixing</h4>
                  <p className="text-gray-600 text-sm">
                    Use a clean container and mix in a 2:1 ratio of plaster to
                    water. Stir thoroughly until you achieve a uniform
                    consistency.
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    Dampening Time
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Allow the mixture to sit for 2-3 minutes for optimal
                    performance.
                  </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Application</h4>
                  <p className="text-gray-600 text-sm">
                    Apply smoothly using a trowel or spatula, and shape as
                    desired.
                  </p>
                </motion.div>

                {/* Step 5 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Setting Time</h4>
                  <p className="text-gray-600 text-sm">
                    The plaster sets within minutes, providing a rapid and
                    efficient finishing solution.
                  </p>
                </motion.div>

                {/* Step 6 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    Finishing Touch
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Sand lightly after drying to achieve a polished surface.
                  </p>
                </motion.div>
                {/* Step 7 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Storage</h4>
                  <p className="text-gray-600 text-sm">
                    Made with sustainable materials that minimize environmental
                    impact while maintaining high quality.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section 3 - BMA Screeding Paint */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-white">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-16">
            {/* Product Information */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="bma-heading-2 font-bold text-[#1D1E25] mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                BMA Screeding Paint
                <br />- Smooth & Durable Finish
              </motion.h2>

              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Transform rough surfaces into smooth, resilient finishes
              </motion.p>

              <motion.div
                className="text-gray-600 space-y-4 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p>
                  BMA Screeding Paint is a high-performance coating designed to
                  transform rough, uneven surfaces into smooth, visually
                  appealing, and resilient finishes.
                </p>

                <p>
                  It enhances both the aesthetic and structural integrity of
                  floors, walls, and other surfaces.
                </p>

                <p>
                  Whether used indoors or outdoors, this screeding paint
                  delivers a professional-grade finish that resists
                  environmental wear.
                </p>
              </motion.div>

              <motion.button
                className="flex items-center cursor-pointer bg-[#0E1853] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1E296B] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Buy Now
              </motion.button>
            </motion.div>

            {/* Product Image */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className=""
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/p3.png"
                  alt="BMA Screeding Paint Product"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x600/1E296B/FFFFFF?text=BMA+Screeding+Paint";
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Features and Usage Section */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Features & Benefits */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-[#1D1E25] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Features & Benefits
              </motion.h3>

              <div className="space-y-6">
                {/* Feature 1 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Surface Smoothing
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Effectively covers imperfections, cracks, and rough
                      patches.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Strong Adhesion</h4>
                    <p className="text-gray-600 text-sm">
                      Bonds well to a variety of surfaces, ensuring long-lasting
                      results.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Weatherproof</h4>
                    <p className="text-gray-600 text-sm">
                      Resistant to moisture, heat, and environmental factors.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 4 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Fast Drying</h4>
                    <p className="text-gray-600 text-sm">
                      Enables quick project completion with minimal downtime.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 5 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Versatile Application
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Suitable for interior and exterior surfaces, including
                      walls, floors, and ceilings.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 6 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Enhanced Durability
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Achieve a professional-grade, smooth, and refined finish
                      every time.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 7 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-blue-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                          fill="#04276B"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Eco-Friendly Composition
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Maintains its quality and appearance over time, reducing
                      the need for frequent touch-ups.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* How to Use */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-[#1D1E25] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                How to Use
              </motion.h3>

              <div className="space-y-6">
                {/* Step 1 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    Surface Preparation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Ensure the surface is clean and dry before application.
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    Primer Application
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Use a clean container and mix in a 2:1 ratio of plaster to
                    water. Stir thoroughly until you achieve a uniform
                    consistency.
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Application</h4>
                  <p className="text-gray-600 text-sm">
                    Use a roller or brush to apply BMA Screeding Paint evenly
                    across the surface.
                  </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Drying Time</h4>
                  <p className="text-gray-600 text-sm">
                    Allow sufficient drying time between coats as per
                    manufacturer guidelines.
                  </p>
                </motion.div>

                {/* Step 5 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Finishing</h4>
                  <p className="text-gray-600 text-sm">
                    Light sanding may be required for a perfectly smooth finish.
                  </p>
                </motion.div>

                {/* Step 6 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Storage</h4>
                  <p className="text-gray-600 text-sm">
                    Made with sustainable materials that minimize environmental
                    impact while maintaining high quality.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section 4 - BMA Bond */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-gray-50">
        <div className="container mx-auto max-w-[1440px]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-16">
            {/* Product Image */}
            <motion.div
              className="w-full lg:w-1/2 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                className=""
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/p4.png"
                  alt="BMA Bond - High-Performance Adhesive"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x600/1E296B/FFFFFF?text=BMA+Bond";
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Product Information */}
            <motion.div
              className="w-full lg:w-1/2 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="bma-heading-2 font-bold text-[#1D1E25] mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                BMA Bond - High-Performance Adhesive
              </motion.h2>

              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Superior bonding strength for diverse construction applications
              </motion.p>

              <motion.div
                className="text-gray-600 space-y-4 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p>
                  BMA Bond is a premium-grade adhesive designed for superior
                  bonding strength in various construction applications.
                </p>

                <p>
                  This versatile product is formulated for excellent adhesion on
                  diverse surfaces, making it an essential solution for
                  professionals and DIY users alike.
                </p>

                <p>
                  Its advanced formula ensures a strong, lasting grip that
                  resists wear and tear over time.
                </p>
              </motion.div>

              <motion.button
                className="flex items-center cursor-pointer bg-[#0E1853] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1E296B] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Buy Now
              </motion.button>
            </motion.div>
          </div>

          {/* Features and Usage Section */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Features & Benefits */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-[#1D1E25] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Features & Benefits
              </motion.h3>

              <div className="space-y-6">
                {/* Feature 1 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Strong Bonding</h4>
                    <p className="text-gray-600 text-sm">
                      Forms a high-strength, long-lasting bond on multiple
                      surfaces.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Multipurpose Use
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Suitable for wood, ceramics, plaster, drywall, and other
                      materials.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Easy Application
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Simple and user-friendly application process with fast
                      curing time.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 4 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Weather Resistance
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Designed to withstand environmental conditions without
                      compromising adhesion.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 5 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Non-Toxic & Eco-Friendly
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Safe for use in indoor and outdoor settings with minimal
                      environmental impact.
                    </p>
                  </div>
                </motion.div>

                {/* Feature 6 */}
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#04276B]/30 rounded-full p- h-10 w-10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.46046 0.40802C9.78742 0.662323 9.84632 1.13353 9.59202 1.46049L5.58502 6.61235C4.9613 7.41427 3.78809 7.51833 3.03296 6.83872L0.498283 4.55751C0.1904 4.28041 0.165442 3.80619 0.442536 3.49831C0.71963 3.19043 1.19385 3.16547 1.50173 3.44256L4.03641 5.72378C4.14429 5.82086 4.31189 5.806 4.40099 5.69144L8.40799 0.539579C8.66229 0.212619 9.1335 0.153718 9.46046 0.40802Z"
                        fill="#04276B"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      Flexible and Durable
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Adapts to temperature variations without losing
                      effectiveness.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* How to Use */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-[#1D1E25] mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                How to Use
              </motion.h3>

              <div className="space-y-6">
                {/* Step 1 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    Surface Preparation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Clean the surface to remove dust, grease, or debris.
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Application</h4>
                  <p className="text-gray-600 text-sm">
                    Apply a thin, even layer of BMA Bond adhesive on one or both
                    surfaces.
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">
                    Dampening Time
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Allow the mixture to sit for 2-3 minutes for optimal
                    performance.
                  </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Bonding</h4>
                  <p className="text-gray-600 text-sm">
                    Press surfaces together firmly and hold for a few minutes.
                  </p>
                </motion.div>

                {/* Step 5 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Curing Time</h4>
                  <p className="text-gray-600 text-sm">
                    Allow proper curing based on environmental conditions for
                    optimal results.
                  </p>
                </motion.div>

                {/* Step 6 */}
                <motion.div
                  className="border-l-4 border-blue-500 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-gray-800 mb-1">Storage</h4>
                  <p className="text-gray-600 text-sm">
                    Made with sustainable materials that minimize environmental
                    impact while maintaining high quality.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose BMA PureFix Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-black text-white">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Why Choose BMA PureFix?
            </motion.h2>

            <motion.p
              className="text-white/90 max-w-4xl mx-auto text-base sm:text-lg md:text-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              At BMA PureFix, we are dedicated to delivering high-quality
              construction solutions that prioritize durability, ease of use,
              and exceptional performance. Our products are engineered with
              advanced formulations, ensuring that professionals and homeowners
              achieve outstanding results every time. Whether you're working on
              a residential project, commercial development, or large-scale
              infrastructure, BMA PureFix products are your trusted choice for
              excellence.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {/* Card 1: Reliability */}
            <motion.div
              className="bg-[#1A1A1A] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold text-white mb-3">Reliability</h3>
              <p className="text-white/80">
                Our customers count on us for consistent quality and performance
                in every product we produce
              </p>
            </motion.div>

            {/* Card 2: Innovation */}
            <motion.div
              className="bg-[#1A1A1A] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
              <p className="text-white/80">
                We stay ahead of industry trends, embracing new technologies to
                improve our offerings.
              </p>
            </motion.div>

            {/* Card 3: Sustainability */}
            <motion.div
              className="bg-[#1A1A1A] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold text-white mb-3">
                Sustainability
              </h3>
              <p className="text-white/80">
                We are dedicated to eco-friendly manufacturing practices,
                minimizing waste and reducing our carbon footprint.
              </p>
            </motion.div>

            {/* Card 4: Customer-Centric Approach */}
            <motion.div
              className="bg-[#1A1A1A] rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
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

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl sm:text-3xl font-bold mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Build with Confidence - Choose BMA PureFix.
            </motion.h3>

            <motion.button
              className="bg-white text-[#0E1853] px-8 py-3 rounded-full font-medium transition-colors hover:bg-gray-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Contact our Sales Team
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTAsec />

      {/* Footer */}
      <Footer />
    </>
  );
};
