
'use client'
import axios from "axios";
import { CreateLeadFormData } from "./validationSchema";
import { store } from '@/redux/store';
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { updateUserData } from "@/redux/features/gameResultSlice";


const API_URL = "/api/leads/";

async function create(data: CreateLeadFormData) {
  function setDefaultIfEmpty(value: string, defaultValue: string) {
    return value === "" ? `${defaultValue} - ${uuidv4()}` : value;
  }

  data.email = setDefaultIfEmpty(data.email, "Sin email");
  data.phone = setDefaultIfEmpty(data.phone, "Sin celular");

  try {
    const response = await axios.post(API_URL, data);
    const { id } = response.data;
    store.dispatch(updateUserData({ leadId: id }));

    console.log(id)
    toast.success("Registro con exito", {
      autoClose: 2000,
      closeOnClick: true,
      onClose: () => window.location.href = "/trivia"
    });

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Email y/o celular ya registrados");
        } else {
          // Aquí puedes manejar otros códigos de estado si es necesario
          toast.error(
            "FALLO EL REGISTRO: " +
              (error.response.data.message || "Error desconocido")
          );
        }
      } else {
        console.error("Un error ha ocurrido:", error.message);
        toast.error("Un error ha ocurrido: " + error.message);
      }
    } else {
      // Aquí manejas los errores que no son AxiosErrors
      console.error("Un error inesperado ha ocurrido:", error);
      toast.error("Un error inesperado ha ocurrido:: " + error);
    }
  }
}

export { create };