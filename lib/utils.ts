import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines classes with Tailwind's merge functionality to handle conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date strings to a readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Truncate text to a specific length with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Generate a random ID for elements that need unique identifiers
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Create an optimized image URL with imgix parameters
export function getOptimizedImageUrl(imgixUrl: string, width: number, height: number): string {
  if (!imgixUrl) return '';
  
  // Use double the dimensions for high-resolution displays
  const params = `?w=${width * 2}&h=${height * 2}&fit=crop&auto=format,compress`;
  return `${imgixUrl}${params}`;
}

// Extract the first name from a full name
export function getFirstName(fullName: string): string {
  return fullName.split(' ')[0] || fullName;
}

// Extract rating number from the rating key
export function getRatingNumber(ratingKey?: string): number {
  if (!ratingKey) return 5; // Default to 5 stars
  
  const num = parseInt(ratingKey);
  return isNaN(num) ? 5 : num;
}