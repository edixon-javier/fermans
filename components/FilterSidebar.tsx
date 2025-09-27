import React from 'react';
import { CATEGORIES } from '../constants';

interface FilterSidebarProps {
  allTags: string[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
  selectedTags: string[];
  onTagChange: (tag: string) => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  allTags,
  selectedCategories,
  onCategoryChange,
  selectedTags,
  onTagChange,
  onClearFilters,
}) => {
  return (
    <aside className="w-full lg:w-1/4 xl:w-1/5">
      <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h3 className="text-xl font-bold text-slate-800">Filtros</h3>
          <button
            onClick={onClearFilters}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Limpiar todos los filtros"
          >
            Limpiar
          </button>
        </div>

        {/* Categories Section */}
        <div>
          <h4 className="font-bold text-slate-700 mb-3">Categorías</h4>
          <ul className="space-y-2">
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => onCategoryChange(cat.id)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 focus:ring-2"
                  />
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{cat.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags Section */}
        <div className="mt-8 border-t pt-6">
          <h4 className="font-bold text-slate-700 mb-4">Etiquetas</h4>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagChange(tag)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 capitalize border ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:border-slate-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
