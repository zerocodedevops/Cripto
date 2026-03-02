import type { ServiceConfig } from '../../core/types';

export const servicios: ServiceConfig[] = [
  {
    id: 'integrales',
    name: 'Reformas Integrales',
    slug: 'reformas-integrales-madrid',
    shortDescription:
      'Transformación total de tu vivienda con presupuesto cerrado y plazos garantizados por contrato.',
    fullContent:
      'Nuestras reformas integrales en Madrid están diseñadas para eliminar el caos del proceso. Nos encargamos de todo: demolición, fontanería, electricidad, climatización, albañilería y carpintería. Trabajamos con materiales de primera calidad y arquitectos propios para asegurar que el resultado supere tus expectativas.',
    priceFrom: '450€/m²',
    faqs: [
      {
        question: '¿Qué incluye el presupuesto de una reforma integral?',
        answer:
          'Incluye mano de obra, materiales base, gestión de licencias, dirección de obra y limpieza final.',
      },
    ],
  },
  {
    id: 'cocinas',
    name: 'Refomas de Cocinas',
    slug: 'reformas-cocinas-madrid',
    shortDescription:
      'Diseñamos y ejecutamos la cocina de tus sueños. Funcionalidad, estética y ergonomía sin complicaciones.',
    fullContent:
      'La cocina es el corazón del hogar. En Zero Chaos realizamos reformas de cocinas en Madrid enfocadas en la optimización del espacio y el uso de materiales duraderos. Desde islas modernas hasta cocinas clásicas renovadas.',
    priceFrom: '6.500€',
    faqs: [],
  },
  {
    id: 'banos',
    name: 'Reformas de Baños',
    slug: 'reformas-banos-madrid',
    shortDescription:
      'Renovación rápida e impecable de baños. Estética premium y máxima higiene.',
    fullContent:
      'Reformar el baño es la forma más rápida de añadir valor a tu hogar. Ofrecemos soluciones de cambio de bañera por plato de ducha, alicatados modernos y saneamientos de última generación.',
    priceFrom: '3.200€',
    faqs: [],
  },
];
