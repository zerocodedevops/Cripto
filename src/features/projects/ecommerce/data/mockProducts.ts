import { Product } from '../services/productsApi';

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Mochila Fjallraven - Foldsack No. 1",
    price: 109.95,
    description: "Tu compañera perfecta para el día a día. Fabricada con materiales duraderos y ecológicos, esta mochila ofrece espacio suficiente para tu portátil (hasta 15 pulgadas) y todos tus esenciales diarios.",
    category: "ropa hombre",
    image: "/assets/projects/ecommerce/backpack.png",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Camiseta Estilo Casual - Ajuste Slim",
    price: 22.3,
    description: "Camiseta de algodón 100% premium con corte ajustado. Ideal para un look casual pero elegante. Disponible en varios colores, resistente a los lavados y extremadamente cómoda.",
    category: "ropa hombre",
    image: "/assets/projects/ecommerce/tshirt.png",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Chaqueta de Algodón Ligera",
    price: 55.99,
    description: "Perfecta para el entretiempo. Esta chaqueta combina estilo y funcionalidad. Cuenta con bolsillos interiores seguros y un forro transpirable que te mantiene cómodo.",
    category: "ropa hombre",
    image: "/assets/projects/ecommerce/jacket.png",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "Pulsera 'Dragon Blood' - Edición Limitada",
    price: 15.99,
    description: "Una pieza de joyería única inspirada en leyendas antiguas. Fabricada con aleación de zinc y piedras semipreciosas. El regalo perfecto para los amantes de la fantasía.",
    category: "joyeria",
    image: "/assets/projects/ecommerce/bracelet.png",
    rating: { rate: 2.1, count: 430 }
  },
  {
    id: 5,
    title: "Anillo 'Petite Micropavé' en Oro Blanco",
    price: 168,
    description: "Elegancia pura. Este anillo de oro blanco de 14k cuenta con un diseño delicado con incrustaciones de diamantes sintéticos de alta calidad. Ideal para compromisos o aniversarios.",
    category: "joyeria",
    image: "/assets/projects/ecommerce/ring.png",
    rating: { rate: 4.6, count: 400 }
  },
  {
    id: 6,
    title: "Disco SSD Interno WestDigital 2TB",
    price: 99.99,
    description: "Acelera tu flujo de trabajo con velocidades de lectura de hasta 560MB/s. Tecnología 3D NAND para mayor durabilidad y menor consumo energético. Compatible con PC y Mac.",
    category: "electronica",
    image: "/assets/projects/ecommerce/ssd.png",
    rating: { rate: 2.9, count: 160 }
  },
  {
    id: 7,
    title: "Monitor Gaming Acer SB220Q 21.5\"",
    price: 599,
    description: "Sumérgete en el juego con este monitor Full HD ultra delgado. Panel IPS para colores vibrantes, 75Hz de refresco y tecnología Radeon FreeSync para una imagen sin cortes.",
    category: "electronica",
    image: "/assets/projects/ecommerce/monitor.png",
    rating: { rate: 2.9, count: 250 }
  },
  {
    id: 8,
    title: "Chaqueta de Nieve 'Biker' para Mujer",
    price: 29.95,
    description: "Estilo motero con protección invernal. Piel sintética de alta calidad con forro polar interior. Resistente al viento y al agua, perfecta para aventuras urbanas en invierno.",
    category: "ropa mujer",
    image: "/assets/projects/ecommerce/biker_jacket.png",
    rating: { rate: 2.9, count: 340 }
  },
  {
    id: 15,
    title: "Chaqueta de Invierno 3 en 1",
    price: 56.99,
    description: "Versatilidad total. Usa el forro polar solo, el cortavientos solo, o ambos juntos para máxima protección. Impermeable y transpirable, ideal para senderismo.",
    category: "ropa mujer",
    image: "/assets/projects/ecommerce/winter_jacket.png",
    rating: { rate: 2.6, count: 235 }
  },
  {
    id: 17,
    title: "Gabardina Clásica Rayas Azules",
    price: 39.99,
    description: "Un clásico reinventado. Esta gabardina ligera es perfecta para los días de lluvia suave. Incluye capucha desmontable y bolsillos profundos.",
    category: "ropa mujer",
    image: "/assets/projects/ecommerce/trench_coat.png",
    rating: { rate: 3.8, count: 679 }
  },
  {
    id: 18,
    title: "Reloj Inteligente 'Titanyum X'",
    price: 199.5,
    description: "Monitoreo de salud 24/7, GPS integrado y batería de 14 días. El compañero ideal para tus entrenamientos y tu vida conectada.",
    category: "electronica",
    image: "/assets/projects/ecommerce/smartwatch.png",
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 19,
    title: "Teclado Mecánico RGB 60%",
    price: 89.99,
    description: "Switches mecánicos rojos silenciosos, iluminación RGB personalizable por tecla y chasis de aluminio. Perfecto para developers y gamers.",
    category: "electronica",
    image: "/assets/projects/ecommerce/keyboard.png",
    rating: { rate: 4.8, count: 350 }
  },
  {
    id: 20,
    title: "Sudadera 'Debug Mode On'",
    price: 34.95,
    description: "Sudadera con capucha unisex. Material 80% algodón, 20% poliéster. Cálida, cómoda y con el código fuente impreso en la espalda.",
    category: "ropa hombre",
    image: "/assets/projects/ecommerce/hoodie_debug.png",
    rating: { rate: 4.2, count: 85 }
  },
  {
    id: 21,
    title: "Auriculares Noise Cancelling Pro",
    price: 249,
    description: "Aíslate del mundo y concéntrate en tu código. Cancelación de ruido activa líder en la industria y 30 horas de reproducción.",
    category: "electronica",
    image: "/assets/projects/ecommerce/headphones.png",
    rating: { rate: 4.9, count: 1100 }
  },
  {
    id: 22,
    title: "Mochila Antirrobo 'DevPack'",
    price: 45,
    description: "Diseño ergonómico, puerto de carga USB integrado y cremalleras ocultas. Protege tu equipo en el transporte público.",
    category: "accesorios",
    image: "/assets/projects/ecommerce/backpack_tech.png",
    rating: { rate: 4.0, count: 210 }
  }
];
