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
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-[var(--color-primary)]" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(query.length > 0)}
          className="block w-full bg-white border border-[var(--color-primary-light)] rounded-full py-4 pl-12 sm:pl-14 pr-6 text-lg text-[var(--color-gray-900)] placeholder-[var(--color-gray-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] shadow-md transition-shadow duration-300 hover:shadow-lg"
          placeholder="Buscar ingrediente, marca o aplicación (ej. 'Carbopol', 'antiaging', 'conservante')"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-xl border border-[var(--color-primary-light)] shadow-lg overflow-hidden z-20">
          <ul>
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
