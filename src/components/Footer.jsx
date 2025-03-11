export const Footer = () => {
  return (
    <>
      <footer className="bg-[#1E296B] text-white pt-16 pb-6">
        <div className="container mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <img
                src="/logo.png"
                alt="BMA PureFix"
                className="h mb-4 w-24 sm:w-35"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='180' height='36' viewBox='0 0 180 36'%3e%3crect width='120' height='36' fill='%23FFFFFF' fill-opacity='0.2'/%3e%3ctext x='10' y='22' font-family='Arial, sans-serif' font-size='16' font-weight='bold' fill='white'%3eBMA%3c/text%3e%3ctext x='54' y='22' font-family='Arial, sans-serif' font-size='16' font-weight='bold' fill='white'%3ePURE%3c/text%3e%3ctext x='100' y='22' font-family='Arial, sans-serif' font-size='16' font-weight='bold' fill='red'%3eFIX%3c/text%3e%3c/svg%3e";
                }}
              />
              <p className="text-sm text-gray-300 leading-relaxed">
                Leading supplier of premium pop cement and screening paint for
                the construction industry.
              </p>
            </div>

            {/* Pages Links */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Pages</h3>
              <ul className="space-y-2">
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
              <ul className="space-y-2">
                <li>
                  <a
                    href="/products/pop-cement"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Pop Cement
                  </a>
                </li>
                <li>
                  <a
                    href="/products/screening-paint"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Screening Paint
                  </a>
                </li>
                <li>
                  <a
                    href="/products/bond"
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
                  href="https://instagram.com/bmapurefix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/bmapurefix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/bmapurefix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    No 2, Amuda Ojere, Iwo Road, Ibadan, Oyo State, Nigeria.
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
