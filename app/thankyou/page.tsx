"use client";
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ThankYouPage = () => {
  useEffect(() => {
    // Configuración básica del confeti
    const fireConfetti = () => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }, // Altura desde donde inicia el confeti
      });
    };

    // Ejecutar el confeti una vez al cargar la página
    fireConfetti();
    
    // Opcional: Repetir el efecto cada pocos segundos
    const interval = setInterval(fireConfetti, 6000); // Dispara cada 3 segundos

    // Limpieza para detener el confeti al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold">¡Gracias por tu paticipación!</h1>
      <p className="text-lg mt-4">Te ganaste 30% de descuento en una Tirolesa.</p>
    </div>
  );
};

export default ThankYouPage;
