import React from 'react';
import { BRANDS } from '../constants';

const Brands: React.FC = () => {
  // Guard against empty BRANDS array to prevent issues
  if (!BRANDS || BRANDS.length === 0) {
    return null;
  }
  
  const logos = [...BRANDS, ...BRANDS];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
          Nuestros Aliados Globales
        </h2>
        <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-16">
          Más de 70 años forjando alianzas para la excelencia en materias primas.
        </p>
        <div
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] group"
        >
          <div
            className="flex w-max animate-scroll group-hover:[animation-play-state:paused]"
            style={{ animationDuration: `${BRANDS.length * 4}s` }}
          >
            {logos.map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 w-60 mx-8 flex items-center justify-center h-24">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 max-w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0 hover:!grayscale-0 hover:scale-110"
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