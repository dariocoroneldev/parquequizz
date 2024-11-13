import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define la interfaz para el estado de cada premio
export interface Prize {
  id: string;
  name: string;
  description: string;
  code: string;
  qrCode?: string;
  status: "AVAILABLE" | "ASSIGNED" | "USED" | "EXPIRED";
  type: "DISCOUNT" | "PRODUCT" | "TICKET" | "VOUCHER" | "SERVICE";
  value?: number | null;
  leadId?: number | null;
  createdAt: Date;
  expiresAt?: Date | null;
}

// Define el estado global para los premios
export interface PrizeState {
  prizes: Prize[]; // Todos los premios
  selectedPrize: Prize | null; // Premio seleccionado al azar
  assignedPrize: Prize | null; // Premio asignado al usuario
}

const initialState: PrizeState = {
  prizes: [],
  selectedPrize: null,
  assignedPrize: null,
};

export const prizeSlice = createSlice({
  name: "prize",
  initialState,
  reducers: {
    // Acción para establecer todos los premios en el estado
    setPrizes: (state, action: PayloadAction<Prize[]>) => {
      state.prizes = action.payload;
    },

    // Acción para seleccionar un premio aleatorio
    selectRandomPrize: (state) => {
        if (state.prizes.length > 0) {
          const randomIndex = Math.floor(Math.random() * state.prizes.length);
          state.selectedPrize = state.prizes[randomIndex];
          console.log("Premio aleatorio seleccionado en slice:", state.selectedPrize);
        }
      },
      
    // Acción para asignar un premio a un usuario específico con leadId y cambiar el estado a ASSIGNED
    assignPrize: (state, action: PayloadAction<{ prizeId: string; leadId: number | null  }>) => {
      const { prizeId, leadId } = action.payload;
      const prizeIndex = state.prizes.findIndex((prize) => prize.id === prizeId);

      if (prizeIndex !== -1) {
        // Actualizamos el premio en la lista de premios
        state.prizes[prizeIndex] = {
          ...state.prizes[prizeIndex],
          status: "ASSIGNED",
          leadId: leadId, // Asigna el leadId al premio
        };
        // También lo asignamos como `assignedPrize`
        state.assignedPrize = state.prizes[prizeIndex];
      }
    },

    // Acción para restablecer el premio asignado después de terminar el juego
    resetAssignedPrize: (state) => {
      state.assignedPrize = null;
    },
  },
});

// Exporta las acciones y el reducer
export const { setPrizes, selectRandomPrize, assignPrize, resetAssignedPrize } = prizeSlice.actions;
export const prizeReducer = prizeSlice.reducer;
           