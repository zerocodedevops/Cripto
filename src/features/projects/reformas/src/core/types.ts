export interface ClientConfig {
  id: string;
  name: string;
  legalName: string;
  domain: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    text: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    city: string;
  };
  seo: {
    mainTitle: string;
    mainDescription: string;
  };
}

export interface BarrioConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export interface ServiceConfig {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullContent: string;
  priceFrom: string;
  faqs: { question: string; answer: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image?: string;
}

export interface ProjectConfig {
  id: string;
  title: string;
  description: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  details: string[];
  tags: string[];
}
