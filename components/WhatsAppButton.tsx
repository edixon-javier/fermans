import React from "react";
import WhatsAppIcon from "./icons/WhatsAppIcon";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "56912345678"; // Replace with your WhatsApp number
  const message = "Hola, quiero información sobre un producto.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 z-30"
      style={{
        width: "70px",
        height: "70px",
        backgroundColor: "#25D366", // verde uniforme (WhatsApp)
        boxShadow: "0 8px 24px rgba(37, 211, 102, 0.5)",
      }}
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="w-10 h-10 p-1" />
    </a>
  );
};

export default WhatsAppButton;
