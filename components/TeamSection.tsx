'use client';

import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { TeamMember } from '@/types';
import TeamGrid from '@/components/TeamGrid';

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

export default function TeamSection({ teamMembers }: TeamSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Only show up to 4 team members on the homepage
  const displayedMembers = teamMembers.slice(0, 4);

  return (
    <section ref={ref} className="section bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-60 translate-y-1/2 translate-x-1/4" />
      
      <div className="container-wide relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-gray-600">
              Our talented professionals are passionate about creating exceptional digital experiences.
            </p>
          </motion.div>
        </div>

        <TeamGrid teamMembers={displayedMembers} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/team" className="button-secondary">
            Meet The Entire Team
          </Link>
        </motion.div>
      </div>
    </section>
  );
}