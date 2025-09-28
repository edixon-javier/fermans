import React, { useState, useEffect, useRef, useCallback } from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Usamos rutas relativas a la raíz del proyecto desplegado
  const banners = [
    'assets/Banner1.jpg',
    'assets/Banner2.png',
    'assets/Banner3.png',
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide === banners.length - 1 ? 0 : prevSlide + 1));
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? banners.length - 1 : prevSlide - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const pauseAutoplay = () => {
    setIsPaused(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Reanudar después de 10 segundos de inactividad
    timeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  // Configurar el intervalo para el cambio automático de diapositivas
  useEffect(() => {
    if (!isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Limpiar intervalos al desmontar el componente
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <div className="relative bg-slate-900 flex flex-col justify-center items-center w-full min-h-[85vh] overflow-hidden">
      {/* Carrusel de imágenes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {banners.map((banner, index) => (
          <div 
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={banner} 
              alt={`Banner ${index + 1}`} 
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black bg-opacity-[0.05]"></div>
          </div>
        ))}
      </div>

      {/* Contenido superpuesto */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10 py-16">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-8/12 mx-auto text-center">
            {/* <div className="text-white">
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
                Insumos especializados — Para formuladores que exigen resultados reproducibles
              </h1>
              <p className="mt-4 text-lg lg:text-xl text-slate-300">
                Ingredientes con respaldo técnico, soluciones sostenibles y representantes internacionales. Encuentre, compare y descargue fichas técnicas en segundos.
              </p>
            </div> */}
            <div className="absolute bottom-[-14rem] left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center justify-center gap-4 z-20">
              <a
                href="#search-bar"
                className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:transform hover:scale-105 backdrop-blur-sm bg-opacity-90"
              >
                Buscar productos
              </a>
              <a 
                href="https://wa.me/56912345678" 
                target="_blank" 
                rel="noopener noreferrer"                 
                className="bg-green-500 text-white font-bold py-4 px-10 rounded-full hover:bg-green-600 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:transform hover:scale-105 inline-flex items-center gap-2 backdrop-blur-sm bg-opacity-90"
              >
                <WhatsAppIcon className="w-6 h-6" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Controles del carrusel */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToSlide(index);
              pauseAutoplay();
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 transition-all backdrop-blur-sm"
        onClick={() => {
          prevSlide();
          pauseAutoplay();
        }}
        aria-label="Diapositiva anterior"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 transition-all backdrop-blur-sm"
        onClick={() => {
          nextSlide();
          pauseAutoplay();
        }}
        aria-label="Diapositiva siguiente"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Hero;
