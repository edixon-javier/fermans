import React from 'react';

interface BreadcrumbItem {
  name: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2 text-sm text-slate-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={item.name} className="flex items-center">
            {index > 0 && (
              <svg className="w-4 h-4 mx-2 text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            )}
            {isLast ? (
              <span className="font-semibold text-slate-700" aria-current="page">
                {item.name}
              </span>
            ) : item.onClick ? (
              <button onClick={item.onClick} className="hover:text-blue-600 transition-colors">
                {item.name}
              </button>
            ) : (
              <a href={item.href} className="hover:text-blue-600 transition-colors">
                {item.name}
              </a>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;