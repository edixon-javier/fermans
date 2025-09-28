import type { Product, Category, Brand } from './types';

export const CATEGORIES: Category[] = [
  { id: 'personal-care', label: 'Cuidado Personal' },
  { id: 'pharma', label: 'Farmacéutico' },
  { id: 'home-care', label: 'Cuidado del Hogar' },
  { id: 'fragrances', label: 'Fragancias' },
  { id: 'industrial', label: 'Industrial' },
];

export const BRANDS: Brand[] = [
  {
    name: 'Aliado 1',
    logo: 'assets/aliado1.webp',
  },
  {
    name: 'Aliado 2',
    logo: 'assets/aliado2.webp',
  },
  {
    name: 'Aliado 3',
    logo: 'assets/aliado3.webp',
  },
  {
    name: 'Aliado 4',
    logo: 'assets/aliado4.webp',
  },
  {
    name: 'Aliado 5',
    logo: 'assets/aliado5.webp',
  },
  {
    name: 'Aliado 6',
    logo: 'assets/aliado6.webp',
  },
];

export const PRODUCTS: Product[] = [
  // Cuidado Personal
  {
    id: 'carbopol-ultrez-21',
    name: 'Carbopol® Ultrez 21 Polymer',
    brand: 'Lubrizol',
    category: 'personal-care',
    tags: ['reología', 'espesante', 'gel', 'suspensión'],
    description: 'Modificador reológico auto-humectante de alta eficiencia para geles transparentes.',
    longDescription: 'Carbopol® Ultrez 21 Polymer es un polímero de poliacrilato reticulado auto-humectante diseñado para espesar tensioactivos. Ofrece una excelente eficiencia de espesamiento y propiedades de suspensión en una amplia gama de aplicaciones de cuidado personal.',
    image: 'https://picsum.photos/seed/carbopol/400/400',
    featured: true,
    technicalSheetUrl: '/sheets/carbopol-ultrez-21.pdf',
    specs: {
      'Apariencia': 'Polvo blanco',
      'Rango de pH (0.5% disp.)': '2.5 - 3.5',
      'Viscosidad (0.5% a pH 7.5)': '50,000 - 70,000 mPa·s',
      'Tipo de Polímero': 'Poliacrilato reticulado'
    },
  },
  {
    id: 'pemulen-tr-2',
    name: 'Pemulen™ TR-2 Polymeric Emulsifier',
    brand: 'Lubrizol',
    category: 'personal-care',
    tags: ['emulsionante', 'estabilizador', 'loción', 'crema'],
    description: 'Emulsionante polimérico para crear emulsiones aceite-en-agua de baja viscosidad.',
    longDescription: 'Pemulen™ TR-2 es un emulsionante polimérico de alto peso molecular diseñado para formar emulsiones estables de aceite en agua sin la necesidad de un tensioactivo tradicional. Es ideal para crear lociones y cremas ligeras y de rápida absorción.',
    image: 'https://picsum.photos/seed/pemulen/400/400',
    featured: true,
    specs: {
      'Función Principal': 'Emulsionante Polimérico',
      'Nivel de Uso Típico': '0.1 - 0.5%',
      'Forma Física': 'Polvo esponjoso'
    },
  },
  // Farmacéutico
  {
    id: 'klucel-hxf',
    name: 'Klucel™ HXF Pharm HPC',
    brand: 'Ashland',
    category: 'pharma',
    tags: ['excipiente', 'aglutinante', 'tableta', 'liberación controlada'],
    description: 'Hidroxipropilcelulosa de grado farmacéutico para recubrimientos y aglutinación.',
    longDescription: 'Klucel™ HXF Pharm HPC es una hidroxipropilcelulosa de alta viscosidad utilizada como aglutinante en granulación húmeda y seca, y como formador de película en recubrimientos de tabletas. Proporciona una excelente dureza de tableta y perfiles de liberación controlada.',
    image: 'https://picsum.photos/seed/klucel/400/400',
    specs: {
      'Grado': 'Farmacéutico (USP/EP)',
      'Viscosidad (2% en agua)': '1,500 - 3,000 mPa·s',
      'Aplicación': 'Aglutinante, Liberación controlada'
    },
  },
  // Cuidado del Hogar
  {
    id: 'ninol-c-5',
    name: 'NINOL® C-5',
    brand: 'Stepan',
    category: 'home-care',
    tags: ['tensioactivo', 'detergente', 'limpiador', 'espuma'],
    description: 'Dietanolamida de coco para aumentar la viscosidad y estabilizar la espuma.',
    longDescription: 'NINOL® C-5 es una cocamida DEA utilizada en una variedad de limpiadores para el hogar e industriales como generador de viscosidad y estabilizador de espuma. Es eficaz en sistemas de tensioactivos aniónicos.',
    image: 'https://picsum.photos/seed/ninol/400/400',
    featured: true,
  },
   // Fragancias
  {
    id: 'ambrofix',
    name: 'Ambrofix',
    brand: 'Givaudan',
    category: 'fragrances',
    tags: ['fragancia', 'ambar', 'madera', 'fijador'],
    description: 'Potente nota de ámbar gris para perfumería fina y de consumo.',
    longDescription: 'Ambrofix es un ingrediente de fragancia altamente potente y sustantivo con un carácter de ámbar gris. Proporciona una base rica y amaderada a las fragancias y actúa como un excelente fijador.',
    image: 'https://picsum.photos/seed/ambrofix/400/400',
  },
  // More products
  {
    id: 'tego-carbomer-340',
    name: 'TEGO® Carbomer 340 FD',
    brand: 'Evonik',
    category: 'personal-care',
    tags: ['reología', 'espesante', 'emulsión'],
    description: 'Polímero de ácido acrílico reticulado para aplicaciones cosméticas.',
    longDescription: 'TEGO® Carbomer 340 FD es un polímero de ácido acrílico reticulado que se utiliza como espesante y estabilizador en emulsiones cosméticas. Proporciona una textura agradable y una buena estabilidad.',
    image: 'https://picsum.photos/seed/tego/400/400',
  },
  {
    id: 'silsense-copolyol-1',
    name: 'SilSense® Copolyol-1 Silicone',
    brand: 'Lubrizol',
    category: 'personal-care',
    tags: ['silicona', 'acondicionador', 'brillo'],
    description: 'Silicona soluble en agua para mejorar el acondicionado en champús y acondicionadores.',
    longDescription: 'SilSense® Copolyol-1 Silicone es un copolímero de dimeticona de polietilenglicol que proporciona propiedades de acondicionado, brillo y tacto sedoso a las formulaciones de cuidado del cabello y la piel.',
    image: 'https://picsum.photos/seed/silsense/400/400',
  },
  {
    id: 'surfactin-lm-sf',
    name: 'Surfactin™ LM-SF',
    brand: 'Croda',
    category: 'personal-care',
    tags: ['tensioactivo', 'suave', 'sin sulfatos', 'natural'],
    description: 'Tensioactivo suave, de origen natural, para formulaciones sin sulfatos.',
    longDescription: 'Surfactin™ LM-SF es una mezcla de tensioactivos suaves derivados de aminoácidos y azúcares. Es ideal para limpiadores faciales, corporales y de bebé que buscan un rendimiento de limpieza eficaz con una excelente suavidad.',
    image: 'https://picsum.photos/seed/surfactin/400/400',
    featured: true,
  },
];