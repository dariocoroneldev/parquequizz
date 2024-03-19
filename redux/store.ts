import { configureStore } from "@reduxjs/toolkit";
import gameResultReducer from "./features/gameResultSlice"

export const store = configureStore({
    reducer:{
        gameResultReducer
    }
})

export type  RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch