import Link from "next/link";

const Footer = () => {
  return (
    <footer className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Top Section - ZAIPUNA OIL */}
      <div className="flex-1 flex items-center justify-center px-4">
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] font-bold text-gray-900 tracking-wider text-center leading-none">
          ZAIPUNA OIL
        </h1>
      </div>

      {/* Bottom Section - Responsive Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-gray-50">
        {/* Mobile: Stack vertically, Desktop: Three columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left - Text */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              About Zaipuna Oil
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Empowering businesses and individuals with premium quality oil
              products. Our commitment to excellence drives innovation in every
              drop.
            </p>
          </div>

          {/* Center - Yellow circle with blur splash on desktop, hidden on mobile */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Blur splash effect */}
              <div className="absolute inset-0 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-60"></div>
              {/* Main yellow circle */}
              <div className="relative w-24 h-24 bg-yellow-400 rounded-full shadow-lg"></div>
            </div>
          </div>

          {/* Right - Index, Social, and Info Columns */}
          <div className="text-center lg:text-start">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {/* Index Section */}
              <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Index
                </h4>
                <nav className="space-y-2 sm:space-y-3">
                  <Link
                    href="/"
                    className="block text-blue-600 hover:text-blue-700 transition-colors text-base sm:text-lg"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-base sm:text-lg"
                  >
                    About
                  </Link>
                  <Link
                    href="/shop"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-base sm:text-lg"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/learn"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-base sm:text-lg"
                  >
                    Learn
                  </Link>
                  <Link
                    href="/faq"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-base sm:text-lg"
                  >
                    FAQ
                  </Link>
                </nav>
              </div>

              {/* Social Section */}
              <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Social
                </h4>
                <nav className="space-y-2 sm:space-y-3">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-base sm:text-lg"
                  >
                    Instagram
                  </Link>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-base sm:text-lg"
                  >
                    Facebook
                  </Link>
                  <Link
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-base sm:text-lg"
                  >
                    Tiktok
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-base sm:text-lg"
                  >
                    Linkedin
                  </Link>
                </nav>
              </div>

              {/* Info Section */}
              <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Info
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  <a
                    href="mailto:hello@zaipuna.com"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-base sm:text-lg"
                  >
                    hello@zaipuna.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-1 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-sm text-gray-500">
          <span className="text-center sm:text-left">
            Site by Kesho Technologies
          </span>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="hover:text-gray-900 transition-colors text-center sm:text-left"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-900 transition-colors text-center sm:text-left"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
