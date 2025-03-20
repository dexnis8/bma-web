export const Footer = () => {
  return (
    <>
      <footer className="bg-[#1E296B] text-white py-12 sm:pt-16 md:pt-24 px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="container mx-auto max-w-[1440px] px">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 pb-10">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <a href="/" className="inline-block">
                <img
                  src="/logo.png"
                  alt="BMA PureFix"
                  className="h-auto mb-4 w-32 sm:w-40"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='180' height='36' viewBox='0 0 180 36'%3e%3crect width='120' height='36' fill='%23FFFFFF' fill-opacity='0.2'/%3e%3ctext x='10' y='22' font-family='Arial, sans-serif' font-size='16' font-weight='bold' fill='white'%3eBMA%3c/text%3e%3ctext x='54' y='22' font-family='Arial, sans-serif' font-size='16' font-weight='bold' fill='white'%3ePURE%3c/text%3e%3ctext x='100' y='22' font-family='Arial, sans-serif' font-size='16' font-weight='bold' fill='red'%3eFIX%3c/text%3e%3c/svg%3e";
                  }}
                />
              </a>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                Leading supplier of premium pop cement and screening paint for
                the construction industry.
              </p>

              {/* GIT Certification */}
              <div className="mt-4">
                <a href="#" className="inline-block">
                  <img
                    src="/son.png"
                    alt="GIT Certification"
                    className="h-16 w-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3e%3ccircle cx='32' cy='32' r='30' fill='%23f0f0f0' stroke='%23ddd' stroke-width='2'/%3e%3ctext x='12' y='36' font-family='Arial, sans-serif' font-size='12' fill='%23666'%3eGIT%3c/text%3e%3c/svg%3e";
                    }}
                  />
                </a>
              </div>
            </div>

            {/* Pages Links */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Pages</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Products Links */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/products"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    GYPSUM Plaster
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Pop Cement
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Screening Paint
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Bond
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-6">
                <a
                  href="https://www.instagram.com/bma_purefix/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/people/Bma-Purefix/61553333283937/?mibextid=aejMdD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/bmapurefixlimited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      <path
                        d="M12.8481 9.67104C12.2282 9.36227 11.6632 8.93245 11.0981 8.50264C9.92772 7.61226 8.7573 6.72188 7.09814 6.90759C5.57956 7.07757 3.7928 8.13321 2.56642 8.9843C1.60491 9.65158 1.09814 10.7717 1.09814 11.9421V20.6893C1.09814 21.5427 2.12604 22.0376 2.83441 21.5616C4.0439 20.7488 5.68683 19.8259 7.09814 19.6679C8.7573 19.4822 9.92772 20.3726 11.0981 21.263C12.2686 22.1534 13.439 23.0437 15.0981 22.858C16.6167 22.6881 18.4035 21.6324 19.6299 20.7813C20.5914 20.114 21.0981 18.9939 21.0981 17.8236V9.84868C21.0981 9.12731 20.3535 8.63305 19.6768 8.88309C18.978 9.14133 18.0893 9.44342 17.1696 9.6875V12.8828C17.1696 14.1254 16.2022 15.1328 15.0089 15.1328C13.8155 15.1328 12.8481 14.1254 12.8481 12.8828V9.67104Z"
                        fill="white"
                      />
                    </g>
                    <path
                      d="M14.25 1.92627C14.25 1.51206 14.5858 1.17627 15 1.17627H21C21.2599 1.17627 21.5013 1.31086 21.638 1.53197C21.7746 1.75308 21.7871 2.02919 21.6708 2.26168L20.8385 3.92627L21.6708 5.59086C21.7871 5.82335 21.7746 6.09946 21.638 6.32057C21.5013 6.54168 21.2599 6.67627 21 6.67627H15.75V13.1615C15.75 13.5757 15.4142 13.9115 15 13.9115C14.5858 13.9115 14.25 13.5757 14.25 13.1615V1.92627Z"
                      fill="white"
                    />
                  </svg>

                  <span className="ml-2">
                    No 2, Amuda Ojere, Iwo Road,
                    <br />
                    Ibadan, Oyo State, Nigeria.
                  </span>
                </div>

                <div className="flex items-start">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.4">
                      <path
                        d="M12.8481 9.67104C12.2282 9.36227 11.6632 8.93245 11.0981 8.50264C9.92772 7.61226 8.7573 6.72188 7.09814 6.90759C5.57956 7.07757 3.7928 8.13321 2.56642 8.9843C1.60491 9.65158 1.09814 10.7717 1.09814 11.9421V20.6893C1.09814 21.5427 2.12604 22.0376 2.83441 21.5616C4.0439 20.7488 5.68683 19.8259 7.09814 19.6679C8.7573 19.4822 9.92772 20.3726 11.0981 21.263C12.2686 22.1534 13.439 23.0437 15.0981 22.858C16.6167 22.6881 18.4035 21.6324 19.6299 20.7813C20.5914 20.114 21.0981 18.9939 21.0981 17.8236V9.84868C21.0981 9.12731 20.3535 8.63305 19.6768 8.88309C18.978 9.14133 18.0893 9.44342 17.1696 9.6875V12.8828C17.1696 14.1254 16.2022 15.1328 15.0089 15.1328C13.8155 15.1328 12.8481 14.1254 12.8481 12.8828V9.67104Z"
                        fill="white"
                      />
                    </g>
                    <path
                      d="M14.25 1.92627C14.25 1.51206 14.5858 1.17627 15 1.17627H21C21.2599 1.17627 21.5013 1.31086 21.638 1.53197C21.7746 1.75308 21.7871 2.02919 21.6708 2.26168L20.8385 3.92627L21.6708 5.59086C21.7871 5.82335 21.7746 6.09946 21.638 6.32057C21.5013 6.54168 21.2599 6.67627 21 6.67627H15.75V13.1615C15.75 13.5757 15.4142 13.9115 15 13.9115C14.5858 13.9115 14.25 13.5757 14.25 13.1615V1.92627Z"
                      fill="white"
                    />
                  </svg>

                  <span className="ml-2">
                    Office 2411, SIT Tower
                    <br />
                    Dubai Silicon Oasis, United Arab Emirates
                  </span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>(+234) 704-700-4913</span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a
                    href="mailto:info@bmapurefix.com"
                    className="hover:text-white transition-colors"
                  >
                    info@bmapurefix.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} BMA Construction. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
