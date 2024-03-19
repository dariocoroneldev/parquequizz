import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leadId: null,
  points: 0,
  answers: [],
  questions: [],
  time:0,
}

export const gameResultSlice = createSlice({
  name: "gameResult",
  initialState,
  reducers:{
    updateResult: (state, action) => {
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
    }
  }
});

// Exporta el reducer y las acciones
export const { updateResult,updateTime } = gameResultSlice.actions;
export default gameResultSlice.reducer;
