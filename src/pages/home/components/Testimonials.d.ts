export interface TestimonialItem {
  id?: string;
  name: string;
  username: string;
  role: string;
  avatar: string;
  content: string;
  link?: string;
  icon?: string;
}

export interface TestimonialsProps {
  id?: string;
  heading?: string;
  description?: string;
  testimonials?: TestimonialItem[];
  className?: string;
  maxTestimonials?: number;
}
