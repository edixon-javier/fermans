import React from 'react';
import { BRANDS } from '../constants';

const Brands: React.FC = () => {
  if (!BRANDS || BRANDS.length === 0) return null;

  const logos = [...BRANDS, ...BRANDS];

  return (
    <section className="py-20 bg-white relative">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary-light)] via-[var(--color-primary)] to-[var(--color-accent)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-sm font-semibold rounded-full mb-3">Red Global</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] leading-tight">
            Nuestros Aliados Globales
          </h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto my-6"></div>
          <p className="text-lg md:text-xl text-[var(--color-gray-700)] mt-4">
            Más de <span className="font-semibold text-[var(--color-primary)]">70 años de experiencia </span> 
            respaldados por <span className="font-semibold text-[var(--color-primary)]">28 empresas líderes </span>  
            en el sector de materias primas.
          </p>
          <p className="text-base text-[var(--color-gray-600)] mt-2">
            Juntos impulsamos la innovación, la calidad y la excelencia en cada proyecto.
          </p>
        </header>

        {/* Carrusel de logos */}
        <div
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] group"
          aria-label="Logos de nuestros aliados globales"
        >
          {/* Decoración de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-light)] via-white to-[var(--color-primary-light)] opacity-50"></div>
          
          <div
            className="flex w-max animate-scroll group-hover:[animation-play-state:paused] relative z-10"
            style={{ animationDuration: `${BRANDS.length * 4}s` }}
          >
            {logos.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-60 mx-8 flex flex-col items-center justify-center h-32"
              >
                <img
                  src={brand.logo}
                  alt={`Logo de ${brand.name}`}
                  className="h-16 max-w-full object-contain transition-all duration-300 hover:scale-110 filter drop-shadow-sm"
                />
                <span className="mt-2 text-sm font-medium text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Botón de más información */}
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center justify-center px-5 py-2 border border-[var(--color-primary)] text-base font-medium rounded-md text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary-light)] transition-colors duration-200">
            Conoce más sobre nuestros aliados
          </a>
        </div>
      </div>
    </section>
  );
};

export default Brands;
