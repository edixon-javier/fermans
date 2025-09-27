import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import Brands from './components/Brands';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FeaturedProducts from './components/FeaturedProducts';
import ProductPage from './components/ProductPage';
import QuickViewModal from './components/QuickViewModal';
import DownloadModal from './components/DownloadModal';
import { PRODUCTS, CATEGORIES } from './constants';
import type { Product } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [productForDownload, setProductForDownload] = useState<Product | null>(null);


  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    PRODUCTS.forEach(p => p.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const queryMatch = searchQuery.length === 0 ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const categoryMatch = selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      
      const tagMatch = selectedTags.length === 0 ||
        selectedTags.every(tag => product.tags.includes(tag));

      return queryMatch && categoryMatch && tagMatch;
    });
  }, [searchQuery, selectedCategories, selectedTags]);

  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewProduct(null); // Close quick view if open
    window.scrollTo(0, 0);
  }

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategories([categoryId]);
    setSelectedTags([]);
    setSearchQuery('');
    setSelectedProduct(null); // Go back to the grid view
  };

  if (selectedProduct) {
    const category = CATEGORIES.find(c => c.id === selectedProduct.category)!;
    const relatedProducts = PRODUCTS.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id);
    return (
      <ProductPage 
        product={selectedProduct}
        category={category}
        relatedProducts={relatedProducts}
        onBack={() => setSelectedProduct(null)}
        onSelectProduct={handleSelectProduct}
        setProductForDownload={setProductForDownload}
        setQuickViewProduct={setQuickViewProduct}
        onCategorySelect={handleCategoryFilter}
      />
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <main>
        <Hero />
        <section className="py-16 -mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar onSearch={handleSearch} suggestions={searchSuggestions} />
          </div>
        </section>
        
        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <FilterSidebar 
                allTags={allTags}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                selectedTags={selectedTags}
                onTagChange={handleTagChange}
                onClearFilters={handleClearFilters}
              />
              <ProductGrid 
                products={filteredProducts} 
                onSelectProduct={handleSelectProduct}
                onQuickView={setQuickViewProduct}
                onDownloadRequest={setProductForDownload}
              />
            </div>
          </div>
        </section>
        
        <FeaturedProducts 
          products={PRODUCTS.filter(p => p.featured)}
          onSelectProduct={handleSelectProduct}
          onQuickView={setQuickViewProduct}
          onDownloadRequest={setProductForDownload}
        />
        <Brands />
      </main>
      <Footer />
      <WhatsAppButton />
      <QuickViewModal 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onSelectProduct={handleSelectProduct}
        onDownloadRequest={setProductForDownload}
      />
      <DownloadModal
        product={productForDownload}
        onClose={() => setProductForDownload(null)}
      />
    </div>
  );
};

export default App;