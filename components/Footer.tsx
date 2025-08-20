import Link from 'next/link';
import { FiLinkedin, FiTwitter, FiGithub, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">DigitalAgency</h3>
            <p className="text-gray-400 mb-4">
              Creating exceptional digital experiences that drive business growth and user engagement.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com" icon={<FiTwitter size={20} />} label="Twitter" />
              <SocialLink href="https://linkedin.com" icon={<FiLinkedin size={20} />} label="LinkedIn" />
              <SocialLink href="https://github.com" icon={<FiGithub size={20} />} label="GitHub" />
              <SocialLink href="https://instagram.com" icon={<FiInstagram size={20} />} label="Instagram" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <FooterLink href="/services">All Services</FooterLink>
              <FooterLink href="/services/web-development">Web Development</FooterLink>
              <FooterLink href="/services/uiux-design">UI/UX Design</FooterLink>
              <FooterLink href="/services/digital-marketing">Digital Marketing</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <FooterLink href="/case-studies">Case Studies</FooterLink>
              <FooterLink href="/team">Our Team</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-400">
              <p>123 Creative Street</p>
              <p>Innovation City, IC 12345</p>
              <p className="mt-3">hello@digitalagency.com</p>
              <p>(123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Digital Agency. All rights reserved.</p>
          <p className="mt-2">
            Built with Next.js and <a href="https://www.cosmicjs.com" className="text-primary-400 hover:text-primary-300 transition-colors" target="_blank" rel="noopener noreferrer">Cosmic</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-white transition-colors duration-200">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </a>
  );
}