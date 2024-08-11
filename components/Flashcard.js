import React, { useState } from 'react';
import './Flashcard.css'; // Optional: Add custom styling

function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      {flipped ? flashcard.answer : flashcard.question}
    </div>
  );
}

export default Flashcard;
