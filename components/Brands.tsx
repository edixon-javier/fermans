import React from 'react';
import { BRANDS } from '../constants';

const Brands: React.FC = () => {
  if (!BRANDS || BRANDS.length === 0) return null;

  const logos = [...BRANDS, ...BRANDS];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            Nuestros Aliados Globales
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mt-4">
            Más de <span className="font-semibold text-slate-800">70 años de experiencia </span> 
            respaldados por <span className="font-semibold text-slate-800">28 empresas líderes </span>  
            en el sector de materias primas.
          </p>
          <p className="text-base text-slate-500 mt-2">
            Juntos impulsamos la innovación, la calidad y la excelencia en cada proyecto.
          </p>
        </header>

        {/* Carrusel de logos */}
        <div
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] group"
          aria-label="Logos de nuestros aliados globales"
        >
          <div
            className="flex w-max animate-scroll group-hover:[animation-play-state:paused]"
            style={{ animationDuration: `${BRANDS.length * 4}s` }}
          >
            {logos.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-60 mx-8 flex items-center justify-center h-24"
              >
                <img
                  src={brand.logo}
                  alt={`Logo de ${brand.name}`}
                  className="h-12 max-w-full object-contain transition-all duration-300  group-hover:grayscale-0 hover:!grayscale-0 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
