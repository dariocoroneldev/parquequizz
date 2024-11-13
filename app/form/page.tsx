"use client"
import selectOptionsCountry from "./data";
import { useForm }  from 'react-hook-form'
import { create } from "./services";
import { CreateLeadFormData, createTouristFormSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { updateUserData } from "@/redux/features/gameResultSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

interface UserData {
  email: string;
  name: string;
  lastname: string;
  phone: string;
  location: string;
}

const RegisterComp = () => {

const { register, handleSubmit,  formState: { errors } } = useForm<CreateLeadFormData>({ resolver: zodResolver(createTouristFormSchema)});
const dispatch = useAppDispatch();

const onSubmit = async (data: UserData) => {
  try {
    await create(data);
    dispatch(updateUserData({ name: data.name }));
  } catch (error) {
    console.error('Error al procesar los datos:', error);
  }
};

const [focusedInput, setFocusedInput] = useState<string | null>(null);

const handleFocus = (inputName: string) => {
  setFocusedInput(inputName);
};

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 py-10 h-screen">
    

        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-center">Completa tus datos</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
              <label
                htmlFor="name"
                className={`mt-3 text-gray-900 ${focusedInput === 'name' ? 'text-blue-500' : ''}`}
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                onFocus={() => handleFocus('name')}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-[#00447f] focus:z-10 sm:text-sm"
                placeholder="Nombre"
                {...register('name')}
              />
              <p className="text-red-800">{errors.name?.message}</p>
            </div>
            <div className="mt-2">
              <label htmlFor="lastname" className="mt-3 text-gray-900">
                Apellido
              </label>
              <input
                id="lastname"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-[#00447f] focus:z-10 sm:text-sm"
                placeholder="Apellido"
                {...register('lastname')}
              />
              <p  className='text-red-800'> {errors.name?.message} </p>
            </div>
            <div className="mt-2">
              <label htmlFor="email-address" className="mt-3 text-gray-900">
                Email
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-[#00447f] focus:z-10 sm:text-sm"
                placeholder="Email"
                {...register('email')}
              />
              <p  className='text-red-800'> {errors.email?.message} </p>
            </div>
            <div className="mt-2">
              <label htmlFor="phone-number" className="mt-3 text-gray-900">
                Número de Teléfono
              </label>
              <input
                id="phone-number"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-[#00447f] focus:z-10 sm:text-sm"
                placeholder="Número de Teléfono"
                {...register('phone')}
              />
              <p  className='text-red-800'> {errors.phone?.message} </p>
            </div>
            <div className="mt-2">
              <label htmlFor="location" className="mt-3 text-gray-900">
                Zona
              </label>
              <select
                id="location"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-[#00447f] focus:z-10 sm:text-sm"
                {...register('location')}
              >
                <option value="" disabled>
                  Zona
                </option>
                {selectOptionsCountry.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
                <p  className='text-red-800'> {errors.location?.message} </p>
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00447f] hover:bg-[#fff]  hover:text-[#00447f] hover:border-[#00447f] focDus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00447f]"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default RegisterComp;