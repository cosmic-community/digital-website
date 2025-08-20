// app/services/[slug]/page.tsx
import { getServiceBySlug, getServices } from '@/lib/cosmic';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ServiceDetails from '@/components/ServiceDetails';
import CtaSection from '@/components/CtaSection';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found | Digital Agency',
      description: 'The requested service could not be found.',
    };
  }
  
  return {
    title: `${service.metadata.service_name} | Digital Agency`,
    description: service.metadata.short_description,
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  // IMPORTANT: In Next.js 15+, params are now Promises and MUST be awaited
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  
  if (!service) {
    notFound();
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title={service.metadata.service_name} 
        subtitle={service.metadata.short_description} 
      />
      
      <ServiceDetails service={service} />
      
      <CtaSection />
    </div>
  );
}