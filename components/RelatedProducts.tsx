import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onDownloadRequest: (product: Product) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, currentProductId, onSelectProduct, onQuickView, onDownloadRequest }) => {
  const related = products.filter(p => p.id !== currentProductId).slice(0, 4);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Productos Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {related.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickView={onQuickView}
              onDownloadRequest={onDownloadRequest}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
