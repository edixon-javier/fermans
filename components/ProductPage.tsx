import React from 'react';
import { Product, Category } from '../types';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import RelatedProducts from './RelatedProducts';
import DownloadIcon from './icons/DownloadIcon';
import WhatsAppButton from './WhatsAppButton';

interface ProductPageProps {
  product: Product;
  category: Category;
  relatedProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  setProductForDownload: (product: Product | null) => void;
  setQuickViewProduct: (product: Product | null) => void;
  onCategorySelect: (categoryId: string) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ 
  product, 
  category, 
  relatedProducts, 
  onBack, 
  onSelectProduct, 
  setProductForDownload,
  setQuickViewProduct,
  onCategorySelect 
}) => {
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Productos', href: '#', onClick: (e) => { e.preventDefault(); onBack(); } },
    { name: category.label, href: '#', onClick: (e) => { e.preventDefault(); onCategorySelect(category.id); } },
    { name: product.name, href: '#' },
  ];

  return (
    <div className="bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start mt-8">
              {/* Image gallery */}
              <div className="w-full aspect-square bg-slate-100 rounded-2xl p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-contain sm:rounded-lg"
                />
              </div>

              {/* Product info */}
              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{product.brand}</p>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{product.name}</h1>

                <div className="mt-3">
                  <p className="text-lg text-slate-600">{product.description}</p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <div
                    className="text-base text-slate-700 space-y-6"
                    dangerouslySetInnerHTML={{ __html: product.longDescription.replace(/\n/g, '<br />') }}
                  />
                </div>

                {/* Technical Specifications Section */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Especificaciones Técnicas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="bg-slate-50 p-3 rounded-lg">
                          <dt className="text-sm font-semibold text-slate-600">{key}</dt>
                          <dd className="mt-1 text-base text-slate-900">{value}</dd>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm font-semibold text-slate-800 bg-slate-200 rounded-full capitalize">
                      {tag}
                    </span>
                  ))}
                </div>

                {product.technicalSheetUrl && (
                  <div className="mt-10 flex">
                    <button
                      onClick={() => setProductForDownload(product)}
                      className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <DownloadIcon className="w-5 h-5 mr-2" />
                      Descargar Ficha Técnica
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <RelatedProducts 
          products={relatedProducts} 
          currentProductId={product.id}
          onSelectProduct={onSelectProduct}
          onQuickView={setQuickViewProduct}
          onDownloadRequest={setProductForDownload}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductPage;