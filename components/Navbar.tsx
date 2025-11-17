
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navLinkClasses = "text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeNavLinkClasses = "text-gray-900";

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-900" aria-label="Página inicial">
              Seu Nome
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                end
              >
                Trabalhos
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
              >
                Sobre
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
              >
                Contato
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
