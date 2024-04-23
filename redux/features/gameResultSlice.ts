import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define una interfaz para el estado global
export interface GameResultState {
  leadId?: string | null;
  name?: string;
  points?: number;
  answers?: Array<string>[] | null; // Tipa tus arrays según corresponda
  questions?: Array<string>[] | null; // Tipa tus arrays según corresponda
  time?: number;
}

const initialState : GameResultState = {
  leadId: null,
  name:"",
  points: 0,
  answers: [],
  questions: [],
  time:0,
}

export const gameResultSlice = createSlice({
  name: "gameResult",
  initialState,
  reducers:{
    updateResult: (state, action: PayloadAction<GameResultState | any>) => {
      const { leadId, points, answers, questions, time } = action.payload;
      // Actualiza los valores del estado con los proporcionados en el payload
      state.leadId = leadId !== undefined ? leadId : state.leadId;
      state.points = points !== undefined ? points : state.points;
      state.answers = answers !== undefined ? answers : state.answers;
      state.questions = questions !== undefined ? questions : state.questions;
      state.time = time !== undefined ? time : state.time;
    },
    updateTime: (state, action) => {
      const { time } = action.payload;
      state.time = time !== undefined ? time : state.time;
    },
    updateUserData: (state, action) => {
      const {name, leadId} = action.payload;
      state.name = name !== undefined ? name : state.name;
      state.leadId = leadId !== undefined ? leadId : state.leadId
    }
  }
});

// Exporta el reducer y las acciones
export const { updateResult, updateTime, updateUserData } = gameResultSlice.actions;
export const gameReducer = gameResultSlice.reducer;
