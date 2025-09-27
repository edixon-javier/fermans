import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Fehrmann S.A.</h3>
            <p className="text-slate-300 text-sm">Materias primas especializadas para formuladores exigentes.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-blue-400">Cuidado Personal</a></li>
              <li><a href="#" className="hover:text-blue-400">Farmacéutico</a></li>
              <li><a href="#" className="hover:text-blue-400">Cuidado del Hogar</a></li>
              <li><a href="#" className="hover:text-blue-400">Fragancias</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-blue-400">Fichas Técnicas</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog / Noticias</a></li>
              <li><a href="#" className="hover:text-blue-400">Nuestros Representados</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><p>Av. Siempre Viva 123, Santiago</p></li>
              <li><a href="tel:+56222222222" className="hover:text-blue-400">+562 2222 2222</a></li>
              <li><a href="mailto:contacto@fehrmann.cl" className="hover:text-blue-400">contacto@fehrmann.cl</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Fehrmann S.A. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
