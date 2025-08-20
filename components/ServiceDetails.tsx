'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import parse from 'html-react-parser';
import type { Service } from '@/types';
import { getOptimizedImageUrl } from '@/lib/utils';

interface ServiceDetailsProps {
  service: Service;
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="section">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {service.metadata.featured_image && (
              <div className="rounded-xl overflow-hidden shadow-lg mb-8">
                <img 
                  src={getOptimizedImageUrl(service.metadata.featured_image.imgix_url, 800, 600)}
                  alt={service.metadata.service_name}
                  className="w-full h-auto"
                  width="800"
                  height="600"
                />
              </div>
            )}

            {service.metadata.key_features && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <ul className="space-y-4">
                  {service.metadata.key_features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-primary-100 text-primary-700 w-8 h-8 rounded-full mr-4 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="prose prose-lg max-w-none">
              {service.metadata.full_description && parse(service.metadata.full_description)}
            </div>
            
            <div className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-gray-600 mb-6">
                Contact us today to discuss how our {service.metadata.service_name} services can help your business succeed.
              </p>
              <a 
                href="/contact" 
                className="button-primary"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}