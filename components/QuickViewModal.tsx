import React from 'react';
import XIcon from './icons/XIcon';
import DownloadIcon from './icons/DownloadIcon';
import type { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onDownloadRequest: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onSelectProduct, onDownloadRequest }) => {
  if (!product) return null;

  const handleSelectAndClose = () => {
    onSelectProduct(product);
    onClose();
  }
  
  const handleDownloadAndClose = () => {
    onDownloadRequest(product);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full relative flex flex-col md:flex-row max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 z-10">
            <XIcon className="w-6 h-6" />
        </button>
        
        {/* Image */}
        <div className="w-full md:w-1/2 bg-slate-100 flex items-center justify-center p-4 shrink-0">
            <img 
                src={product.image} 
                alt={product.name} 
                className="h-64 sm:h-80 md:h-full w-auto object-contain rounded-lg"
            />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{product.brand}</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">{product.name}</h2>
              <p className="text-lg text-slate-600 mt-3">{product.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm font-semibold text-slate-800 bg-slate-200 rounded-full capitalize">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8">
              {product.technicalSheetUrl && (
                  <button
                    onClick={handleDownloadAndClose}
                    className="w-full mb-3 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <DownloadIcon className="w-5 h-5 mr-2" />
                    Descargar Ficha Técnica
                  </button>
              )}
               <button
                  onClick={handleSelectAndClose}
                  className="w-full bg-transparent border border-slate-400 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Ver Detalles Completos
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default QuickViewModal;