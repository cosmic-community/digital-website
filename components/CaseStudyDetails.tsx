'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import parse from 'html-react-parser';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import type { CaseStudy } from '@/types';
import { getOptimizedImageUrl } from '@/lib/utils';

interface CaseStudyDetailsProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetails({ caseStudy }: CaseStudyDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(
    caseStudy.metadata.featured_image?.imgix_url || ''
  );
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Combine featured image and gallery
  const allImages = [
    ...(caseStudy.metadata.featured_image ? [caseStudy.metadata.featured_image] : []),
    ...(caseStudy.metadata.project_gallery || [])
  ];

  return (
    <section ref={ref} className="section">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {selectedImage && (
              <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                <img 
                  src={getOptimizedImageUrl(selectedImage, 800, 600)}
                  alt={caseStudy.metadata.project_title}
                  className="w-full h-auto"
                  width="800"
                  height="600"
                />
              </div>
            )}

            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-3 mb-8">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image.imgix_url)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === image.imgix_url 
                        ? 'border-primary-600 shadow-md' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={`${image.imgix_url}?w=160&h=120&fit=crop&auto=format,compress`}
                      alt={`${caseStudy.metadata.project_title} thumbnail ${index + 1}`}
                      className="w-full h-auto"
                      width="80"
                      height="60"
                    />
                  </button>
                ))}
              </div>
            )}

            {caseStudy.metadata.services_used && caseStudy.metadata.services_used.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-xl font-bold mb-4">Services Used</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.metadata.services_used.map((service) => (
                    <Link 
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-2xl mr-3">{service.metadata.service_icon}</span>
                      <span className="font-medium">{service.metadata.service_name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {caseStudy.metadata.project_url && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold mb-2">Visit Project</h3>
                <a 
                  href={caseStudy.metadata.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors"
                >
                  {caseStudy.metadata.project_url.replace(/^https?:\/\//, '')}
                  <FiExternalLink className="ml-2" />
                </a>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Project Summary</h2>
                <p>{caseStudy.metadata.summary}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Challenge</h2>
                {caseStudy.metadata.challenge && parse(caseStudy.metadata.challenge)}
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Solution</h2>
                {caseStudy.metadata.solution && parse(caseStudy.metadata.solution)}
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Results</h2>
                {caseStudy.metadata.results && parse(caseStudy.metadata.results)}
              </div>
            </div>
            
            <div className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">Ready for similar results?</h3>
              <p className="text-gray-600 mb-6">
                Contact us today to discuss how we can help your business achieve exceptional results.
              </p>
              <Link href="/contact" className="button-primary">
                Start Your Project
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}