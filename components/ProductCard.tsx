import React from 'react';
import type { Product } from '../types';
import DownloadIcon from './icons/DownloadIcon';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onDownloadRequest: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct, onQuickView, onDownloadRequest }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col group">
      <div className="relative">
        <img className="h-56 w-full object-cover" src={product.image} alt={product.name} />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button 
            onClick={() => onQuickView(product)}
            className="text-white bg-slate-800/70 backdrop-blur-sm font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            Vista Rápida
          </button>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{product.brand}</p>
        <h3 className="mt-2 text-xl font-bold text-slate-800 leading-tight">
          <button onClick={() => onSelectProduct(product)} className="hover:text-blue-700 text-left">
            {product.name}
          </button>
        </h3>
        <p className="mt-2 text-slate-600 text-sm flex-grow">{product.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-semibold text-slate-700 bg-slate-200 rounded-full capitalize">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 pt-0 mt-auto">
        {product.technicalSheetUrl && (
          <button
            onClick={() => onDownloadRequest(product)}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Ficha Técnica
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
