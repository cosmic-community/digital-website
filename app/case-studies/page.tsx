import { getCaseStudies } from '@/lib/cosmic';
import PageHeader from '@/components/PageHeader';
import CaseStudyCard from '@/components/CaseStudyCard';
import CtaSection from '@/components/CtaSection';

export const metadata = {
  title: 'Case Studies | Digital Agency',
  description: 'Explore our portfolio of successful client projects and learn how we help businesses achieve their digital goals.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Case Studies" 
        subtitle="Showcasing our best work and client success stories" 
      />
      
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard 
                key={caseStudy.id} 
                caseStudy={caseStudy} 
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>
      
      <CtaSection />
    </div>
  );
}