import { getServices, getFeaturedCaseStudies, getTeamMembers, getFeaturedTestimonials } from '@/lib/cosmic';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TeamSection from '@/components/TeamSection';
import CtaSection from '@/components/CtaSection';

export default async function Home() {
  // Fetch data in parallel
  const [services, caseStudies, teamMembers, testimonials] = await Promise.all([
    getServices(),
    getFeaturedCaseStudies(),
    getTeamMembers(),
    getFeaturedTestimonials(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <ServicesSection services={services} />
      
      <CaseStudiesSection caseStudies={caseStudies} />
      
      <TestimonialsSection testimonials={testimonials} />
      
      <TeamSection teamMembers={teamMembers} />
      
      <CtaSection />
    </div>
  );
}