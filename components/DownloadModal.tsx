import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import type { Product } from '../types';

interface DownloadModalProps {
  product: Product | null;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ product, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically handle the form submission,
    // e.g., send the email to a server and trigger the download.
    setTimeout(() => {
        onClose();
        setIsSubmitted(false);
    }, 3000);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative transition-all duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
            <XIcon className="w-6 h-6" />
        </button>
        <div className="p-8">
          {isSubmitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">¡Gracias!</h2>
              <p className="text-slate-600">Su descarga comenzará en breve. Le hemos enviado una copia a su correo.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2 text-slate-800">Descargar Ficha Técnica</h2>
              <p className="font-semibold text-blue-600 mb-4">{product.name}</p>
              <p className="text-slate-600 mb-6">Para continuar, por favor ingrese su correo electrónico. Le enviaremos el documento y lo mantendremos informado sobre novedades.</p>
              <form onSubmit={handleSubmit}>
                  <label htmlFor="email-download" className="sr-only">Correo electrónico</label>
                  <input 
                      id="email-download"
                      type="email" 
                      placeholder="su.correo@empresa.com"
                      required
                      className="block w-full bg-slate-100 border border-slate-300 rounded-md py-3 px-4 text-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                      type="submit"
                      className="mt-4 w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition duration-300 text-lg shadow-lg"
                  >
                      Descargar ahora
                  </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
