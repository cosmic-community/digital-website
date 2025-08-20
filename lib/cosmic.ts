import { createBucketClient } from '@cosmicjs/sdk';
import { CaseStudy, Service, TeamMember, Testimonial, hasStatus } from '@/types';

// Initialize the Cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
});

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
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching services:', error);
    return [];
  }
}

// Fetch a single service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'services',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
      .status('published');
    
    return response.object as Service;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

// Fetch all team members ordered by display_order
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'team-members',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('metadata.display_order')
      .depth(0)
      .status('published');
    
    return response.objects as TeamMember[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching team members:', error);
    return [];
  }
}

// Fetch all team members by department
export async function getTeamMembersByDepartment(department: string): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'team-members',
        'metadata.department.key': department,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('metadata.display_order')
      .depth(0)
      .status('published');
    
    return response.objects as TeamMember[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error(`Error fetching team members for department ${department}:`, error);
    return [];
  }
}

// Fetch all case studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'case-studies',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .status('published');
    
    return response.objects as CaseStudy[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching case studies:', error);
    return [];
  }
}

// Fetch featured case studies
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
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching featured case studies:', error);
    return [];
  }
}

// Fetch a single case study by slug
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'case-studies',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .status('published');
    
    return response.object as CaseStudy;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error(`Error fetching case study with slug ${slug}:`, error);
    return null;
  }
}

// Fetch all testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'testimonials',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .status('published');
    
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

// Fetch featured testimonials
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'testimonials',
        'metadata.featured': true,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .status('published');
    
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching featured testimonials:', error);
    return [];
  }
}

// Fetch the bucket slug for client-side use
export async function getBucketSlug(): Promise<string> {
  return process.env.COSMIC_BUCKET_SLUG || '';
}