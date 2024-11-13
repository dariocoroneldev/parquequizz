import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectRandomPrize, assignPrize, setPrizes } from "@/redux/features/prizeSlice";
import Image from "next/image";

const Prize: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedPrize, assignedPrize } = useAppSelector((state) => state.prize);
  const { leadId } = useAppSelector((state) => state.gameResult);
  const leadIdNumber = Number(leadId);
  const [showButton, setShowButton] = useState(true);
  const [isPrizeVisible, setIsPrizeVisible] = useState(false);

  // Función para obtener y asignar el premio
  const handleFetchAndAssignPrize = async () => {
    try {
      const response = await fetch("/api/prize"); // Cambia la ruta según tu API
      const data = await response.json();

      if (response.ok) {
        dispatch(setPrizes(data)); // Guardar los premios en el estado de Redux
        dispatch(selectRandomPrize()); // Selecciona un premio aleatorio

        // Asignación del premio seleccionado
        if (selectedPrize && leadId) {
          dispatch(assignPrize({ prizeId: selectedPrize.id, leadId: leadIdNumber }));

          const assignResponse = await fetch(`/api/prize`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: selectedPrize.id, leadId }),
          });

          if (assignResponse.ok) {
            setShowButton(false); // Oculta el botón "Obtener Premio" después de la asignación
            setIsPrizeVisible(true); // Muestra la información del premio después de la asignación
          }
        }
      } else {
        console.error("Error al cargar los premios:", data);
      }
    } catch (error) {
      console.error("Error en el fetch de premios:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {showButton && (
        <button
          onClick={handleFetchAndAssignPrize}
          className="px-4 py-2 mb-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Obtener Premio
        </button>
      )}

      {isPrizeVisible && selectedPrize && (
        <div className="flex flex-col items-center p-6 border rounded-md shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-2">{selectedPrize.name}</h2>
          <p className="mb-4">{selectedPrize.description}</p>
          <Image
            src={selectedPrize.qrCode || ""}
            alt="Código QR del premio"
            width={200}
            height={200}
            className="mb-4"
          />
          <p className="text-lg font-semibold mb-6">{selectedPrize.code}</p>
        </div>
      )}

      {/* {assignedPrize && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-green-600">Premio Asignado:</h3>
          <p>{assignedPrize.name}</p>
          <p>Código: {assignedPrize.code}</p>
        </div>
      )} */}
    </div>
  );
};

export default Prize;
