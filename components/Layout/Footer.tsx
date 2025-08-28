import Link from "next/link";

const Footer = () => {
  return (
    <footer className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Top Section - ZAIPUNA OIL */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-9xl md:text-[12rem] lg:text-[15rem] font-bold text-gray-900 tracking-wider">
          ZAIPUNA OIL
        </h1>
      </div>

      {/* Bottom Section - Three Grid */}
      <div className="grid grid-cols-3 gap-8 px-8 py-16">
        {/* Left - Text */}
        <div className="text-left">
          <h3 className="text-2xl font-bold mb-4">About Zaipuna Oil</h3>
          <p className="text-gray-600 leading-relaxed">
            Empowering businesses and individuals with premium quality oil
            products. Our commitment to excellence drives innovation in every
            drop.
          </p>
        </div>

        {/* Center - Empty */}
        <div className="flex items-center justify-center">
          {/* Empty space as requested */}
        </div>

        {/* Right - Index, Social, and Info Columns */}
        <div className="text-start">
          <div className="grid grid-cols-3 gap-8">
            {/* Index Section */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Index</h4>
              <nav className="space-y-3">
                <Link
                  href="/"
                  className="block text-blue-600 hover:text-blue-700 transition-colors text-lg"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                >
                  About
                </Link>
                <Link
                  href="/shop"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                >
                  Shop
                </Link>
                <Link
                  href="/learn"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                >
                  Learn
                </Link>
                <Link
                  href="/faq"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                >
                  FAQ
                </Link>
              </nav>
            </div>

            {/* Social Section */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Social</h4>
              <nav className="space-y-3">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                >
                  Instagram
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                >
                  Facebook
                </Link>
                <Link
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                >
                  Tiktok
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                >
                  Linkedin
                </Link>
              </nav>
            </div>

            {/* Info Section */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Info</h4>
              <div className="space-y-3">
                <a
                  href="mailto:hello@zaipuna.com"
                  className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                >
                  hello@zaipuna.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="border-t border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Site by Kesho Technologies</span>
          <Link
            href="/privacy"
            className="hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-900 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
