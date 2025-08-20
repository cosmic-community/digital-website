export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    service_name: string;
    short_description: string;
    full_description: string;
    service_icon?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    key_features?: string[];
    display_order?: number;
  };
}

export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    full_name: string;
    job_title: string;
    bio: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    social_links?: {
      linkedin?: string;
      twitter?: string;
      dribbble?: string;
      github?: string;
      [key: string]: string | undefined;
    };
    department?: {
      key: string;
      value: string;
    };
    display_order?: number;
  };
}

export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name: string;
    client_company?: string;
    client_title?: string;
    testimonial_text: string;
    client_photo?: {
      url: string;
      imgix_url: string;
    };
    company_logo?: {
      url: string;
      imgix_url: string;
    };
    rating?: {
      key: string;
      value: string;
    };
    related_services?: Service[];
    featured?: boolean;
  };
}

export interface CaseStudy extends CosmicObject {
  type: 'case-studies';
  metadata: {
    project_title: string;
    client_name: string;
    client_industry?: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    project_gallery?: {
      url: string;
      imgix_url: string;
    }[];
    project_url?: string;
    services_used?: Service[];
    featured?: boolean;
  };
}

export type Department = 'leadership' | 'development' | 'design' | 'marketing' | 'operations';

export interface DepartmentInfo {
  key: Department;
  value: string;
}

// Type guard functions for runtime validation
export function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'services';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

export function isCaseStudy(obj: CosmicObject): obj is CaseStudy {
  return obj.type === 'case-studies';
}

// Utility function to check if an error object has a status property
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}