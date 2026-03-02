import type { ProjectConfig } from '../../core/types';

export const proyectos: ProjectConfig[] = [
  {
    id: '1',
    title: 'Reforma Integral en Chamberí',
    location: 'Barrio de Chamberí, Madrid',
    description:
      'Transformación completa de un piso de 90m² de los años 70 en un espacio moderno y abierto.',
    beforeImage:
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=2070&auto=format&fit=crop', // Placeholder for "Before"
    afterImage:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop', // Placeholder for "After"
    details: [
      'Derribo de tabiquería para crear salón-comedor-cocina de 45m².',
      'Instalación completa de fontanería y electricidad bajo normativa actual.',
      'Instalación de suelo radiante por aerotermia.',
      'Cocina a medida con isla de piedra natural.',
    ],
    tags: ['Integral', 'Chamberí', 'Diseño Moderno'],
  },
  {
    id: '2',
    title: 'Cocina de Diseño en Retiro',
    location: 'Distrito Retiro, Madrid',
    description:
      'Optimización de espacio y actualización estética en un edificio señorial cerca del parque.',
    beforeImage:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop', // Placeholder for "Before"
    afterImage:
      'https://images.unsplash.com/photo-1556912177-3e5270923053?q=80&w=2070&auto=format&fit=crop', // Placeholder for "After"
    details: [
      'Cambio de mobiliario por laca blanca de alta resistencia.',
      'Encimera Dekton con fregadero integrado.',
      'Iluminación LED perimetral y bajo armarios.',
      'Integración oculta de electrodomésticos de alta gama.',
    ],
    tags: ['Cocina', 'Retiro', 'Premium'],
  },
];
