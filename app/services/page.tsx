import { getServices } from '@/lib/cosmic';
import PageHeader from '@/components/PageHeader';
import ServiceCard from '@/components/ServiceCard';
import CtaSection from '@/components/CtaSection';

export const metadata = {
  title: 'Our Services | Digital Agency',
  description: 'Explore our comprehensive range of digital services including web development, UI/UX design, and digital marketing solutions.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive digital solutions tailored to your business needs" 
      />
      
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                className="h-full" 
                showFullDescription={true}
              />
            ))}
          </div>
        </div>
      </section>
      
      <CtaSection />
    </div>
  );
}