import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "56912345678"; // Replace with your WhatsApp number
  const message = "Hola, quiero información sobre un producto.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-[#059669] w-18 h-18 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#047857] transition-all duration-300 hover:scale-110 z-30 animate-pulse hover:animate-none"
      style={{ 
        width: "70px", 
        height: "70px",
        boxShadow: "0 8px 24px rgba(5, 150, 105, 0.5)",
        animation: "pulse 2s infinite"
      }}
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="w-10 h-10 p-1"/>
      <span className="absolute flex h-5 w-5 -right-1 -top-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 bg-[#059669]"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
