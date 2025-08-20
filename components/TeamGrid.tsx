'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiGithub, FiDribbble } from 'react-icons/fi';
import type { TeamMember } from '@/types';
import { getOptimizedImageUrl } from '@/lib/utils';

interface TeamGridProps {
  teamMembers: TeamMember[];
}

export default function TeamGrid({ teamMembers }: TeamGridProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <FiLinkedin size={18} />;
      case 'twitter':
        return <FiTwitter size={18} />;
      case 'github':
        return <FiGithub size={18} />;
      case 'dribbble':
        return <FiDribbble size={18} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {teamMembers.map((member) => (
        <motion.div
          key={member.id}
          variants={itemVariants}
          className="stripe-card text-center"
        >
          {member.metadata.profile_photo && (
            <div className="mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden">
              <img 
                src={getOptimizedImageUrl(member.metadata.profile_photo.imgix_url, 256, 256)}
                alt={member.metadata.full_name}
                className="w-full h-full object-cover"
                width="128"
                height="128"
              />
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-1">{member.metadata.full_name}</h3>
          
          <p className="text-primary-600 mb-4">{member.metadata.job_title}</p>
          
          <p className="text-gray-600 text-sm mb-6">{member.metadata.bio.substring(0, 120)}...</p>
          
          {member.metadata.social_links && (
            <div className="flex justify-center space-x-4">
              {Object.entries(member.metadata.social_links).map(([platform, url]) => (
                url && (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                    aria-label={`${member.metadata.full_name}'s ${platform}`}
                  >
                    {getSocialIcon(platform)}
                  </a>
                )
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}