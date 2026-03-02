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
