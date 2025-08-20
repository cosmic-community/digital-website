'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      <div className="container-wide relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              We create <span className="gradient-text highlight-shadow">exceptional</span> digital experiences
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">
              Our team of experts combines creativity and technology to deliver digital solutions that drive business growth and delight users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="button-primary">
                Explore Our Services
              </Link>
              <Link href="/contact" className="button-secondary">
                Get in Touch
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <p className="text-sm font-medium text-gray-500">Trusted by innovative companies:</p>
              <div className="flex flex-wrap gap-8">
                {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'].map((brand, index) => (
                  <div key={index} className="text-gray-400 font-semibold text-sm">
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-primary-100 to-transparent opacity-80 rounded-full blur-3xl" />
              <img 
                src="https://imgix.cosmicjs.com/939a3a20-7d71-11f0-8dcc-651091f6a7c0-photo-1460925895917-afdab827c52f-1755658720868.jpg?w=1000&h=800&fit=crop&auto=format,compress" 
                alt="Digital Agency Hero" 
                className="relative z-10 rounded-2xl shadow-xl max-w-full h-auto object-cover"
                width="600"
                height="500"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-primary-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary-200 rounded-full blur-3xl opacity-50" />
    </section>
  );
}