import { getTeamMembers } from '@/lib/cosmic';
import PageHeader from '@/components/PageHeader';
import TeamGrid from '@/components/TeamGrid';
import CtaSection from '@/components/CtaSection';

export const metadata = {
  title: 'Our Team | Digital Agency',
  description: 'Meet our talented team of designers, developers, and marketing experts who drive innovation and results.',
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Our Team" 
        subtitle="Meet the talented individuals behind our success" 
      />
      
      <section className="section">
        <div className="container-wide">
          <TeamGrid teamMembers={teamMembers} />
        </div>
      </section>
      
      <CtaSection />
    </div>
  );
}