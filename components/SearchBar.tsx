import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from './icons/SearchIcon';
import type { Product } from '../types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: Product[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, suggestions }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 250); // 250ms debounce time

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  return (
    <div id="search-bar" ref={searchRef} className="relative max-w-3xl mx-auto">
      <div className="relative" style={{ animation: "fadeIn 0.5s ease-in-out" }}>
        <div className="absolute inset-y-0 left-0 pl-5 sm:pl-6 flex items-center pointer-events-none">
          <SearchIcon className="h-7 w-7 text-[#3b82f6]" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(query.length > 0)}
          className="block w-full bg-white border border-[var(--color-primary-light)] rounded-xl py-5 pl-14 sm:pl-16 pr-6 text-lg text-[#374151] placeholder-[#6b7280] focus:outline-none focus:ring-3 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] shadow-md transition-all duration-300 hover:shadow-lg"
          placeholder="Buscar ingrediente, marca o aplicación (ej. 'Carbopol', 'antiaging', 'conservante')"
          style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(59,130,246,0.1)" }}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute mt-3 w-full bg-white rounded-xl border border-[#e5e7eb] shadow-xl overflow-hidden z-20"
            style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", 
                    animation: "fadeInUp 0.3s ease-out" }}>
          <ul className="divide-y divide-[#f3f4f6]">
            {suggestions.map((product) => (
              <li key={product.id} className="cursor-pointer hover:bg-[var(--color-primary-light)] transition-colors duration-200">
                <a href="#" className="flex items-center p-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover mr-4 border border-[var(--color-gray-200)]" />
                  <div>
                    <p className="font-semibold text-[var(--color-primary-dark)]">{product.name}</p>
                    <p className="text-sm text-[var(--color-accent)]">{product.brand}</p>
                  </div>
                </a>
              </li>
            ))}
             <li className="p-4 text-center text-sm text-[var(--color-primary)] bg-[var(--color-primary-light)]">
                Mostrando {suggestions.length} de {suggestions.length} resultados...
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
