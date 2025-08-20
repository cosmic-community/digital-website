'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  className?: string;
  showFullDescription?: boolean;
}

export default function ServiceCard({ 
  service, 
  className,
  showFullDescription = false 
}: ServiceCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "stripe-card flex flex-col h-full",
        className
      )}
    >
      <div className="mb-6">
        {service.metadata.service_icon && (
          <span className="text-4xl">{service.metadata.service_icon}</span>
        )}
      </div>
      
      <h3 className="text-2xl font-bold mb-3">{service.metadata.service_name}</h3>
      
      <p className="text-gray-600 mb-6 flex-grow">
        {service.metadata.short_description}
      </p>
      
      {showFullDescription && service.metadata.key_features && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Key Features</h4>
          <ul className="space-y-2">
            {service.metadata.key_features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Link 
        href={`/services/${service.slug}`} 
        className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors mt-auto"
      >
        Learn more <FiArrowRight className="ml-2" />
      </Link>
    </motion.div>
  );
}