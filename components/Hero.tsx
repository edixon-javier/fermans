import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-slate-900 pt-16 pb-32 flex content-center items-center justify-center min-h-[75vh]">
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{ backgroundImage: "url('https://picsum.photos/seed/lab/1920/1080')" }}
      >
        <span id="blackOverlay" className="w-full h-full absolute opacity-60 bg-black"></span>
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-8/12 mx-auto text-center">
            <div className="text-white">
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
                Insumos especializados — Para formuladores que exigen resultados reproducibles
              </h1>
              <p className="mt-4 text-lg lg:text-xl text-slate-300">
                Ingredientes con respaldo técnico, soluciones sostenibles y representantes internacionales. Encuentre, compare y descargue fichas técnicas en segundos.
              </p>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#search-bar" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 text-lg shadow-lg">
                    Buscar productos
                </a>
                 <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition duration-300 text-lg shadow-lg inline-flex items-center gap-2">
                    <WhatsAppIcon className="w-6 h-6" />
                    Contactar por WhatsApp
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
