import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onDownloadRequest: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onSelectProduct, onQuickView, onDownloadRequest }) => {
  return (
    <main className="w-full lg:w-3/4 xl:w-4/5">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-800">{products.length} producto(s) encontrado(s)</h2>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelectProduct={onSelectProduct}
              onQuickView={onQuickView}
              onDownloadRequest={onDownloadRequest}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
          <h3 className="text-2xl font-bold text-slate-800">No se encontraron productos</h3>
          <p className="mt-2 text-slate-600">Intente ajustar sus filtros o términos de búsqueda.</p>
        </div>
      )}
    </main>
  );
};

export default ProductGrid;
