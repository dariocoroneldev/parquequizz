"use client"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import StarRating from './startRating';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

type SurveyItem = {
  id: number;
  prompt: string;
  type: "star-rating" | "multiple-choice" | "text";
  options?: string[];
  maxStars?: number | null;
};

const SurveyForm = () => {
  // Obtener el ID y nombre del usuario desde Redux sin mostrarlos en el formulario
  const { leadId } = useAppSelector((state) => state.gameResult);

  const [surveyItems, setSurveyItems] = useState<SurveyItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar las preguntas desde la base de datos al iniciar el componente
    const fetchSurveyItems = async () => {
      try {
        const response = await axios.get<SurveyItem[]>('/api/poll');
        setSurveyItems(response.data);
      } catch (error) {
        console.error('Error al cargar las preguntas:', error);
        alert('Hubo un problema al cargar la encuesta.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyItems();
  }, []);

  const currentQuestion = surveyItems[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < surveyItems.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitResponses(); // Llama a la función para enviar respuestas
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleResponse = (value: any) => {
    setResponses({
      ...responses,
      [currentQuestion.id]: value,
    });
  };

  const submitResponses = async () => {
    try {
      const formattedResponses = Object.entries(responses).map(([surveyItemId, answer]) => ({
        surveyItemId: Number(surveyItemId),
        answer: answer.toString(),
      }));

      // Incluye `leadId` y `name` ocultamente en los datos enviados a la API
      const requestData = {
        userId: leadId,
        responses: formattedResponses,
      };

      await axios.post('/api/poll', requestData);
      alert('¡Respuestas enviadas exitosamente!');
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
      alert('Hubo un error al enviar tus respuestas.');
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'star-rating':
        return (
          <StarRating
            maxStars={currentQuestion.maxStars || 0}
            rating={responses[currentQuestion.id] || 0}
            onRating={(rating) => handleResponse(rating)}
          />
        );
      case 'multiple-choice':
        return (
          <div>
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleResponse(option)}
                className={`p-2 border rounded-lg m-1 ${
                  responses[currentQuestion.id] === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 'text':
        return (
          <textarea
            onChange={(e) => handleResponse(e.target.value)}
            value={responses[currentQuestion.id] || ''}
            className="border p-2 w-full"
          />
        );
      default:
        return null;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-xl font-semibold text-center">
        {currentQuestion?.prompt}
      </h2>

      <div className="mt-4">{renderQuestion()}</div>

      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-300 p-2 rounded"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {currentQuestionIndex < surveyItems.length - 1 ? 'Siguiente' : 'Enviar'}
        </button>
      </div>
    </div>
  );
};

export default SurveyForm;
