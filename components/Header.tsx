'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-wide flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text">
          DigitalAgency
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/case-studies">Case Studies</NavLink>
          <NavLink href="/team">Our Team</NavLink>
          <NavLink href="/contact" className="button-primary ml-4">
            Contact Us
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container py-6 flex flex-col space-y-4">
              <MobileNavLink href="/services" onClick={closeMobileMenu}>
                Services
              </MobileNavLink>
              <MobileNavLink href="/case-studies" onClick={closeMobileMenu}>
                Case Studies
              </MobileNavLink>
              <MobileNavLink href="/team" onClick={closeMobileMenu}>
                Our Team
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={closeMobileMenu} className="button-primary text-center mt-4">
                Contact Us
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'font-medium text-foreground hover:text-primary-600 transition-colors duration-200',
        className
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'block py-3 text-lg text-center font-medium text-foreground hover:text-primary-600 transition-colors duration-200',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}