import type { ReactNode } from 'react';

// Define la interfaz base, aunque ReactNode no es estrictamente necesario aquí.
export interface MenuItem {
  label: string;
  // children es un array opcional de otros MenuItem, permitiendo anidación.
  children?: MenuItem[];
}

export const MENU_CATEGORIES: MenuItem[] = [
  // --- CATEGORÍA 1: CUIDADO PERSONAL (Manteniendo la estructura detallada) ---
  {
    label: 'Cuidado Personal',
    children: [
      {
        label: 'Cuidado de Piel',
        children: [
          { 
            label: 'Cuidado Facial',
            children: [
              { label: 'Antienvejecimiento' },
              { label: 'Hidratación' },
              { label: 'Limpiadores' },
            ]
          },
          { 
            label: 'Cuidado Corporal',
            children: [
              { label: 'Cremas y Lociones' },
              { label: 'Mantequillas Corporales' },
              { label: 'Tratamientos específicos' },
            ]
          },
          { label: 'Protección Solar' },
        ],
      },
      {
        label: 'Cuidado de Cabello',
        children: [
          { label: 'Tintes' },
          {
            label: 'Shampoo',
            children: [
              { label: 'Activos' },
              { label: 'Extractos' },
              { label: 'Dispersantes, solventes y solubilizantes' },
              { label: 'Modificadores reológicos' },
              // Nivel 4 de Profundidad
              { 
                label: 'Surfactantes',
                children: [
                  { label: 'Primarios Aniónicos' },
                  { label: 'Secundarios Anfóteros' },
                  { label: 'No Iónicos' },
                ]
              }, 
              { label: 'Siliconas' },
              { label: 'Preservantes' },
              { label: 'Proteínas' },
            ],
          },
          { label: 'Acondicionador' },
          { label: 'Estilizado' },
          {
            label: 'Tratamiento',
            children: [
              { label: 'Keratinas' },
              { label: 'Aceites naturales y emolientes' },
              { label: 'Complejos Vitamínicos' },
            ],
          },
        ],
      },
      { label: 'Bath and Shower' },
      { label: 'Maquillaje/Color' },
      { label: 'Absorbentes' },
    ],
  },
  
  // --- CATEGORÍA 2: FARMACÉUTICO (Expandida a 3 niveles) ---
  { 
    label: 'Farmacéutico',
    children: [
      {
        label: 'Formulaciones Orales',
        children: [
          { label: 'Excipientes para Tabletas' },
          { label: 'Excipientes para Cápsulas' },
          { label: 'Excipientes Líquidos (Jarabe)' },
        ]
      },
      {
        label: 'Formulaciones Tópicas',
        children: [
          { label: 'Geles y Emulsiones' },
          { label: 'Ingredientes Activos (API)' },
          { label: 'Penetrantes' },
        ]
      },
      { label: 'Formulaciones Inyectables' },
      { label: 'Nutracéuticos' },
    ]
  },
  
  // --- CATEGORÍA 3: CUIDADO DEL HOGAR (Expandida a 3 niveles) ---
  { 
    label: 'Cuidado del Hogar',
    children: [
      {
        label: 'Limpieza de Telas',
        children: [
          { label: 'Tensoactivos' },
          { label: 'Potenciadores de color' },
          { label: 'Agentes secuestrantes' },
        ]
      },
      {
        label: 'Cuidado de Platos',
        children: [
          { label: 'Detergentes Manuales' },
          { label: 'Detergentes para Lavavajillas' },
        ]
      },
      {
        label: 'Limpieza de Superficies',
        children: [
          { label: 'Desinfectantes y Sanitizantes' },
          { label: 'Agentes Pulidores' },
        ]
      },
      { label: 'Ambientadores y Odorantes' },
    ]
  },
  
  // --- CATEGORÍA 4: FRAGANCIAS (Expandida a 3 niveles) ---
  { 
    label: 'Fragancias',
    children: [
      {
        label: 'Fragancias Finas',
        children: [
          { label: 'Bases Alcoholicas' },
          { label: 'Notas Cítricas' },
          { label: 'Notas Amaderadas' },
        ]
      },
      {
        label: 'Fragancias Funcionales',
        children: [
          { label: 'Tecnología Anti-Olor' },
          { label: 'Cápsulas Inteligentes' },
          { label: 'Fragancias con Beneficios Emocionales (EmotiCODE™)' },
        ]
      },
      { label: 'Aceites Esenciales' },
    ]
  },
  
  // --- CATEGORÍA 5: FILTROS Y EQUIPOS (Expandida a 3 niveles) ---
  { 
    label: 'Filtros y Equipos',
    children: [
      {
        label: 'Equipos de Filtración',
        children: [
          { label: 'Filtros de Cartucho' },
          { label: 'Sistemas de Membrana' },
          { label: 'Sistemas de Ósmosis Inversa' },
        ]
      },
      {
        label: 'Medios Filtrantes',
        children: [
          { label: 'Carbon Activado' },
          { label: 'Tierras Diatomeas' },
          { label: 'Polímeros' },
        ]
      },
      { label: 'Servicios de Ingeniería' },
    ]
  },
  
  // --- CATEGORÍA 6: VETERINARIO (Expandida a 3 niveles) ---
  { 
    label: 'Veterinario',
    children: [
      {
        label: 'Activos y Excipientes',
        children: [
          { label: 'Activos de Uso Oral' },
          { label: 'Excipientes Inyectables' },
        ]
      },
      { label: 'Salud Animal Mayor (Ganadería)' },
      { label: 'Salud Animal Menor (Mascotas)' },
      { label: 'Nutracéuticos Veterinarios' },
    ]
  },
  
  // --- CATEGORÍA 7: INDUSTRIAL (Expandida a 3 niveles) ---
  { 
    label: 'Industrial',
    children: [
      {
        label: 'Químicos Especializados',
        children: [
          { label: 'Polímeros Industriales' },
          { label: 'Aditivos para Pinturas y Recubrimientos' },
        ]
      },
      { label: 'Tratamiento de Aguas' },
      { label: 'Minería' },
      { label: 'Petróleo y Gas' },
    ]
  },
];