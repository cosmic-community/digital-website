'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Testimonial } from '@/types';
import { cn, getRatingNumber } from '@/lib/utils';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Auto-advance testimonials
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, testimonials.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const pauseSlider = () => {
    setIsPaused(true);
  };

  const resumeSlider = () => {
    setIsPaused(false);
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="section stripe-gradient relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grain-overlay"></div>
      </div>
      
      <div className="container-wide relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-white text-opacity-80">
              Don't just take our word for it. Hear what our clients have to say about working with us.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={pauseSlider}
          onMouseLeave={resumeSlider}
        >
          <div className="relative overflow-hidden stripe-card p-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "transition-opacity duration-500 absolute inset-0 flex flex-col p-10",
                  index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
                aria-hidden={index !== activeIndex}
              >
                <div className="mb-6">
                  <StarRating rating={getRatingNumber(testimonial.metadata.rating?.key)} />
                </div>
                
                <blockquote className="text-xl italic text-gray-700 mb-8">
                  "{testimonial.metadata.testimonial_text}"
                </blockquote>
                
                <div className="mt-auto flex items-center">
                  {testimonial.metadata.client_photo && (
                    <div className="mr-4 w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={`${testimonial.metadata.client_photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                        alt={testimonial.metadata.client_name}
                        className="w-full h-full object-cover"
                        width="64"
                        height="64"
                      />
                    </div>
                  )}
                  
                  <div>
                    <div className="font-bold text-lg">{testimonial.metadata.client_name}</div>
                    {testimonial.metadata.client_title && testimonial.metadata.client_company && (
                      <div className="text-gray-600">
                        {testimonial.metadata.client_title}, {testimonial.metadata.client_company}
                      </div>
                    )}
                  </div>
                  
                  {testimonial.metadata.company_logo && (
                    <div className="ml-auto">
                      <img 
                        src={`${testimonial.metadata.company_logo.imgix_url}?w=120&h=60&fit=crop&auto=format,compress`}
                        alt={testimonial.metadata.client_company || "Company logo"}
                        className="h-10 w-auto object-contain"
                        width="120"
                        height="60"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft size={20} />
              </button>
              
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full mx-1 transition-colors",
                    index === activeIndex ? "bg-white" : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : "false"}
                />
              ))}
              
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white text-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="Next testimonial"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-6 h-6 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}