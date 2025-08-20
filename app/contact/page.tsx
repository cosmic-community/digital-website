import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Digital Agency',
  description: 'Get in touch with our team to discuss your project requirements and how we can help your business grow.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader 
        title="Contact Us" 
        subtitle="Let's discuss how we can help your business grow" 
      />
      
      <section className="section">
        <div className="container-wide max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-700 mb-8">
                Have a project in mind or want to learn more about our services? We'd love to hear from you. Fill out the form and one of our team members will get back to you shortly.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-primary-600">hello@digitalagency.com</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p>(123) 456-7890</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Office</h3>
                  <p>123 Creative Street<br />Innovation City, IC 12345</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}