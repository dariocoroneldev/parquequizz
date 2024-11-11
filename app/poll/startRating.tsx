interface StarRatingProps {
    maxStars: number;
    rating: number; // Valor actual de calificación desde el formulario principal
    onRating: (rating: number) => void;
  }
  
  const StarRating = ({ maxStars, rating, onRating }: StarRatingProps) => {
    const handleClick = (index: number) => {
      onRating(index + 1); // Enviar la calificación seleccionada al formulario
    };
  
    return (
      <div className="flex space-x-1">
        {Array.from({ length: maxStars }, (_, index) => (
          <span
            key={index}
            onClick={() => handleClick(index)}
            className={index < rating ? 'text-yellow-400' : 'text-gray-400'}
            style={{ cursor: 'pointer' }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  
  export default StarRating;
  