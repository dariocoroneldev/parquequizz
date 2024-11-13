import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { gameReducer } from "./features/gameResultSlice";
import { prizeReducer } from "./features/prizeSlice"; // Asegúrate de importar el reducer de prize
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root", // Cambia a "root" para persistir todo el estado raíz
  storage,
  whitelist: ["gameResult", "prize"], // Lista de reducers que deseas persistir
};

const rootReducer = combineReducers({
  gameResult: gameReducer,
  prize: prizeReducer, // Agrega el reducer de prize
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production", // Habilita Redux DevTools solo en desarrollo
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
