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
      className="fixed bottom-6 right-6 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-30"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8"/>
    </a>
  );
};

export default WhatsAppButton;
