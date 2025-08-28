"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
      {/* Left Navigation Section */}
      <div className="absolute left-0 top-0 h-16 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="hidden md:block">
          <div className="flex items-baseline space-x-8 bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl px-4 py-2">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              ABOUT
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              SHOP
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            >
              LEARN
            </Link>
          </div>
        </div>
      </div>

      {/* Centered Logo Section */}
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-18 flex items-center bg-red-500 px-12 rounded-bl-2xl rounded-br-2xl">
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ZAIPUNA
          </Link>
        </div>
      </div>

      {/* Right Section - CTA Button & Mobile Menu */}
      <div className="absolute right-0 top-0 h-16 flex items-center px-4 sm:px-6 lg:px-8">
        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Button className="hover:bg-blue-400 text-white rounded-3xl border border-gray-300">
            CART
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium transition-colors"
            >
              Contact
            </Link>
            <div className="pt-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
