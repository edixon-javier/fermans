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
          <SearchIcon className="h-6 w-6 text-slate-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(query.length > 0)}
          className="block w-full bg-white border border-slate-300 rounded-full py-4 pl-12 sm:pl-14 pr-6 text-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg"
          placeholder="Buscar ingrediente, marca o aplicación (ej. 'Carbopol', 'antiaging', 'conservante')"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-xl overflow-hidden z-20">
          <ul>
            {suggestions.map((product) => (
              <li key={product.id} className="cursor-pointer hover:bg-slate-100">
                <a href="#" className="flex items-center p-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                  <div>
                    <p className="font-semibold text-slate-800">{product.name}</p>
                    <p className="text-sm text-slate-500">{product.brand}</p>
                  </div>
                </a>
              </li>
            ))}
             <li className="p-4 text-center text-sm text-slate-600 bg-slate-50">
                Mostrando {suggestions.length} de {suggestions.length} resultados...
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
