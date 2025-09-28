import React, { useState, useEffect, useRef, useCallback } from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Usamos rutas relativas a la base URL configurada en Vite (/fermans/)
  const banners = [
    '/fermans/assets/banner1.jpg',
    '/fermans/assets/banner2.png',
    '/fermans/assets/banner3.png',    
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
    
    // Reanudar después de 5 segundos de inactividad
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
    <div style={{ height: '80vh' }} className="relative bg-slate-900 flex flex-col justify-center items-center w-full overflow-hidden">
      {/* Carrusel de imágenes */}
      <div className="absolute inset-0 w-full h-full">
        {banners.map((banner, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={banner} 
              alt={`Banner ${index + 1}`} 
              className="w-full h-full object-fill"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0  bg-opacity-10"></div>
          </div>
        ))}
      </div>

      {/* Contenido superpuesto */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full px-4 pb-10 sm:px-6 lg:px-8">
        {/* Botones de acción centrados */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
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
            className="bg-green-700 text-white font-bold py-4 px-10 rounded-full hover:bg-green-800 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:transform hover:scale-105 inline-flex items-center gap-2 backdrop-blur-sm bg-opacity-90"
          >
            <WhatsAppIcon className="w-6 h-6" />
            Contactar por WhatsApp
          </a>
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-slate-900 w-6' 
                : 'bg-slate-700 hover:bg-slate-900'
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900/90 text-white p-2 rounded-full z-20 transition-all duration-300 backdrop-blur-sm"
        onClick={() => {
          prevSlide();
          pauseAutoplay();
        }}
        aria-label="Diapositiva anterior"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900/90 text-white p-2 rounded-full z-20 transition-all duration-300 backdrop-blur-sm"
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