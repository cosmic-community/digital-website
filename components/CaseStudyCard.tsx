'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { cn, truncateText } from '@/lib/utils';
import type { CaseStudy } from '@/types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  className?: string;
}

export default function CaseStudyCard({ caseStudy, className }: CaseStudyCardProps) {
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
        "group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-stripe",
        className
      )}
    >
      {caseStudy.metadata.featured_image && (
        <div className="relative overflow-hidden h-56">
          <img 
            src={`${caseStudy.metadata.featured_image.imgix_url}?w=800&h=560&fit=crop&auto=format,compress`}
            alt={caseStudy.metadata.project_title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            width="400"
            height="280"
          />
          {caseStudy.metadata.client_industry && (
            <div className="absolute top-4 right-4 bg-white text-gray-700 text-sm font-medium py-1 px-3 rounded-full">
              {caseStudy.metadata.client_industry}
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">
          {caseStudy.metadata.project_title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-3">
          Client: {caseStudy.metadata.client_name}
        </p>
        
        <p className="text-gray-600 mb-6 line-clamp-3">
          {truncateText(caseStudy.metadata.summary, 150)}
        </p>
        
        {caseStudy.metadata.services_used && caseStudy.metadata.services_used.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {caseStudy.metadata.services_used.map((service) => (
                <span 
                  key={service.id} 
                  className="inline-block bg-gray-100 text-gray-700 text-xs font-medium py-1 px-2 rounded"
                >
                  {service.metadata.service_name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <Link 
          href={`/case-studies/${caseStudy.slug}`} 
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors"
        >
          View Case Study <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </motion.div>
  );
}