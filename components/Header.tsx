import React, { useState, useEffect, useRef } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import { MENU_CATEGORIES } from './menuConstants';
import type { MenuItem } from './menuConstants';

// --- Menu Structure for Mobile Navigation ---
const MAIN_NAV_ITEMS: MenuItem[] = [
  { label: 'Nosotros' },
  { label: 'Categorías', children: MENU_CATEGORIES },
  { label: 'Funcionalidades' },
  { label: 'Aliados' },
  { label: 'Contacto' },
  { label: 'Intranet' },
  { label: 'Blog' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // --- Desktop Menu State ---
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState<string[]>([]);
  const menuTimeoutRef = useRef<number | null>(null);

  // --- Mobile Menu State ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobilePath, setMobilePath] = useState<MenuItem[]>([]);

  // --- Refs for Accessibility & Focus Management ---
  const categoryButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  
  // --- Effects ---

  // Effect to handle header style change on scroll.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // --- Desktop Menu Handlers ---
  const openDesktopMenu = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setIsDesktopMenuOpen(true);
  };

  const closeDesktopMenu = () => {
    setIsDesktopMenuOpen(false);
    setActivePath([]);
    categoryButtonRef.current?.focus();
  };

  const handleMenuEnter = () => {
    openDesktopMenu();
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = window.setTimeout(() => {
      closeDesktopMenu();
    }, 200);
  };
  
  const handlePathEnter = (path: string[]) => {
    setActivePath(path);
  };

  // --- Accessibility Effects & Handlers ---

  useEffect(() => {
    if (isDesktopMenuOpen) {
      setTimeout(() => {
        menuPanelRef.current?.querySelector<HTMLAnchorElement>('[role="menuitem"]')?.focus();
      }, 100);
    }
  }, [isDesktopMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDesktopMenuOpen &&
        !categoryButtonRef.current?.contains(event.target as Node) &&
        !menuPanelRef.current?.contains(event.target as Node)
      ) {
        closeDesktopMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDesktopMenuOpen]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDesktopMenu();
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDesktopMenu();
    }
  };
  
  // --- Mobile Menu Handlers ---
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setTimeout(() => setMobilePath([]), 300);
  };
  
  const handleMobileNavClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      setMobilePath(prev => [...prev, item]);
    } else {
      closeMobileMenu();
    }
  };

  const handleMobileBack = () => {
    setMobilePath(prev => prev.slice(0, -1));
  };
  
  // --- Desktop Menu Rendering ---
  const renderSubMenuColumn = (items: MenuItem[], level: number): React.ReactNode => (
    // STYLE CHANGE: Increased column width and added vertical padding for more breathing room.
    <ul className="w-72 flex-shrink-0 py-4 px-2">
      {items.map((item) => {
        const currentPath = activePath.slice(0, level + 1);
        currentPath[level] = item.label;
        const hasChildren = item.children && item.children.length > 0;
        const isActive = activePath[level] === item.label;
        return (
          <li key={item.label}>
            <a
              href="#"
              role="menuitem"
              tabIndex={isDesktopMenuOpen ? 0 : -1}
              aria-haspopup={hasChildren ? 'true' : undefined}
              aria-expanded={hasChildren ? isActive : undefined}
              onMouseEnter={() => handlePathEnter(currentPath)}
              onFocus={() => handlePathEnter(currentPath)}
              className={`flex items-center justify-between w-full text-left transition-colors rounded-md
                ${/* STYLE CHANGE: Increased padding for better clickability and readability. */''}
                px-4 py-3
                ${/* STYLE CHANGE: Updated text styles for better hierarchy and accessible focus state. */''}
                text-sm leading-snug
                ${
                  isActive 
                  ? 'bg-blue-50 text-blue-600 font-semibold' 
                  // STYLE CHANGE: Using a lighter gray for non-active items and a lighter hover background.
                  // Added explicit focus style for keyboard navigation accessibility.
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:bg-slate-100'
                }`}
            >
              <span>{item.label}</span>
              {hasChildren && <ChevronRightIcon className="h-4 w-4 text-slate-400" />}
            </a>
          </li>
        );
      })}
    </ul>
  );

  const getVisibleMenuColumns = (path: string[]) => {
    let currentLevelItems = MENU_CATEGORIES;
    const columnsToRender = [{ items: currentLevelItems, level: 0 }];
    for (let i = 0; i < path.length; i++) {
      const activeLabel = path[i];
      const activeItem = currentLevelItems.find(item => item.label === activeLabel);
      if (activeItem?.children?.length) {
        currentLevelItems = activeItem.children;
        columnsToRender.push({ items: currentLevelItems, level: i + 1 });
      } else {
        break;
      }
    }
    return columnsToRender;
  };

  const visibleColumns = getVisibleMenuColumns(activePath);
  
  // --- Common Styles ---
  const navLinkClasses = `font-semibold px-3 py-2 rounded-md text-sm hover:text-blue-600 transition-colors ${
    isScrolled ? 'text-slate-700' : 'text-black'
  }`;

  // --- Dynamic data for Mobile Menu ---
  const currentMobileMenuTitle = mobilePath.length > 0 ? mobilePath[mobilePath.length - 1].label : 'Menú';
  const mainPanelItems = [{ label: 'Inicio', children: MAIN_NAV_ITEMS }];
  const allPanels = [...mainPanelItems, ...mobilePath];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-blue-600">Fehrmann S.A.</a>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <a href="#" className={navLinkClasses}>Nosotros</a>
              <div onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave}>
                <button
                  ref={categoryButtonRef}
                  id="desktop-category-trigger"
                  aria-haspopup="true"
                  aria-controls="desktop-megamenu"
                  aria-expanded={isDesktopMenuOpen}
                  onClick={openDesktopMenu}
                  onKeyDown={handleTriggerKeyDown}
                  className={`${navLinkClasses} inline-flex items-center`}
                >
                  <span>Categorías</span>
                  <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDesktopMenuOpen ? 'rotate-180' : ''}`}/>
                </button>
                <div
                  ref={menuPanelRef}
                  id="desktop-megamenu"
                  onKeyDown={handleMenuKeyDown}
                  aria-labelledby="desktop-category-trigger"
                  className={`absolute left-0 w-full pt-4 transition-opacity duration-200 ease-out ${
                    isDesktopMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  style={{ pointerEvents: isDesktopMenuOpen ? 'auto' : 'none' }}
                >
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                       // STYLE CHANGE: Replaced shadow-2xl with a more subtle shadow-lg for an elegant look.
                      className={`bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-transform duration-200 ease-out origin-top ${
                        isDesktopMenuOpen ? 'scale-100' : 'scale-95'
                      }`}
                      role="menu"
                    >
                      <div className="flex overflow-x-auto max-h-[75vh]">
                        {visibleColumns.map((col, index) => (
                          // STYLE CHANGE: Added a finer separator between columns.
                          <div key={index} className={`bg-white ${index > 0 ? 'border-l border-slate-200' : ''}`}>
                            {renderSubMenuColumn(col.items, col.level)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className={navLinkClasses}>Funcionalidades</a>
              <a href="#" className={navLinkClasses}>Aliados</a>
              <a href="#" className={navLinkClasses}>Contacto</a>
              <a href="#" className={navLinkClasses}>Intranet</a>
              <a href="#" className={navLinkClasses}>Blog</a>
            </div>
          </div>
          
          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden">
            <button
              onClick={openMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Abrir menú principal</span>
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Off-canvas Menu --- */}
      <div id="mobile-menu" role="dialog" aria-modal="true" className={`fixed inset-0 z-50 md:hidden ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
        
        <div
          className={`relative h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b h-20 flex-shrink-0">
            {mobilePath.length > 0 ? (
              <button onClick={handleMobileBack} className="flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600 p-2 -ml-2">
                <ChevronLeftIcon className="w-5 h-5 mr-1" />
                Volver
              </button>
            ) : <div />}
            <h2 className="font-bold text-slate-800 text-lg">{currentMobileMenuTitle}</h2>
            <button onClick={closeMobileMenu} className="p-2 -mr-2">
              <span className="sr-only">Cerrar menú</span>
              <XIcon className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          <div className="flex-grow overflow-hidden">
            <div
              className="h-full flex transition-transform duration-300 ease-in-out"
              style={{ width: `${allPanels.length * 100}%`, transform: `translateX(-${mobilePath.length * (100 / allPanels.length)}%)` }}
            >
              {allPanels.map((panelItem, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 h-full overflow-y-auto"
                  style={{ width: `${100 / allPanels.length}%` }}
                >
                  <ul className="divide-y">
                    {panelItem.children?.map(item => (
                      <li key={item.label}>
                        <button
                          onClick={() => handleMobileNavClick(item)}
                          className="flex items-center justify-between w-full text-left px-4 py-4 text-slate-700 font-semibold hover:bg-slate-50"
                        >
                          <span>{item.label}</span>
                          {item.children && item.children.length > 0 && <ChevronRightIcon className="w-5 h-5 text-slate-400" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;