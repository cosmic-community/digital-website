// app/case-studies/[slug]/page.tsx
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/cosmic';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import CaseStudyDetails from '@/components/CaseStudyDetails';
import CtaSection from '@/components/CtaSection';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Digital Agency',
      description: 'The requested case study could not be found.',
    };
  }
  
  return {
    title: `${caseStudy.metadata.project_title} | Digital Agency`,
    description: caseStudy.metadata.summary.substring(0, 160),
  };
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  
  if (!caseStudy) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title={caseStudy.metadata.project_title} 
        subtitle={`Client: ${caseStudy.metadata.client_name} | Industry: ${caseStudy.metadata.client_industry || 'Various'}`} 
      />
      
      <CaseStudyDetails caseStudy={caseStudy} />
      
      <CtaSection />
    </div>
  );
}