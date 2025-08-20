# Digital Agency Website

![Digital Agency Website](https://imgix.cosmicjs.com/939a3a20-7d71-11f0-8dcc-651091f6a7c0-photo-1460925895917-afdab827c52f-1755658720868.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive website for a digital agency built with Next.js and styled with a Stripe-inspired design. This website showcases services, team members, case studies, and client testimonials with a sleek, professional interface.

## Features

- **Modern, Stripe-inspired Design** - Clean typography, subtle gradients, and smooth animations
- **Responsive Layout** - Optimized for all devices from mobile to desktop
- **Dynamic Content Management** - Powered by Cosmic CMS for easy content updates
- **Service Showcase** - Interactive presentation of agency services
- **Team Member Profiles** - Professional display of team members with bios
- **Case Studies Portfolio** - Detailed case studies with rich media and results
- **Client Testimonials** - Social proof from satisfied clients
- **Performance Optimized** - Fast loading times and smooth interactions
- **TypeScript Integration** - Type-safe code for reliable development
- **SEO Friendly** - Built with search engine optimization in mind

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68a538ec06b0460f30fe6568&clone_repository=68a53c3f06b0460f30fe6586)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a digital agency company website with services, team members, testimonials, and case studies"

### Code Generation Prompt

> Build a Next.js website for a digital agency company. Style like stripe.com

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 15** - React framework for production-grade applications
- **TypeScript** - For type safety and enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - For smooth animations and transitions
- **React Intersection Observer** - For scroll-based animations
- **Cosmic SDK** - For seamless content management
- **Headless UI** - Accessible UI components
- **ESLint & Prettier** - For code quality and consistency

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Bun (recommended) or npm
- A Cosmic account with content

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd digital-agency-website
```

2. Install dependencies
```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Start the development server
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

This application uses the Cosmic SDK to fetch content from your Cosmic bucket. Here are some key examples of how the SDK is used:

### Fetching Services

```typescript
// Fetch all services ordered by display_order
export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'services',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('metadata.display_order')
      .depth(0)
      .status('published');
    
    return response.objects as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}
```

### Fetching Case Studies

```typescript
// Fetch featured case studies with related services
export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'case-studies',
        'metadata.featured': true,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(3)
      .status('published');
    
    return response.objects as CaseStudy[];
  } catch (error) {
    console.error('Error fetching featured case studies:', error);
    return [];
  }
}
```

## Cosmic CMS Integration

This website is fully integrated with your Cosmic CMS, allowing you to:

- **Manage Services** - Add, edit, or remove agency services
- **Update Team Profiles** - Keep team member information current
- **Publish Case Studies** - Showcase your best work with rich media
- **Feature Testimonials** - Highlight client feedback and success stories

All content is dynamically pulled from your Cosmic bucket, ensuring your website stays up-to-date with your latest content changes.

## Deployment Options

### Vercel (Recommended)

The easiest way to deploy your Next.js app:

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify

Another excellent option for hosting your Next.js site:

1. Push your code to a GitHub repository
2. Import the project to Netlify
3. Configure the build settings and environment variables
4. Deploy!

### Self-hosted

For self-hosted deployments:

1. Build the application:
```bash
bun run build
```

2. Start the production server:
```bash
bun run start
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Cosmic CMS Documentation](https://www.cosmicjs.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
<!-- README_END -->