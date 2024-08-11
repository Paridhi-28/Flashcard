import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const response = await axios.get('/api/flashcards');
    setFlashcards(response.data);
  };

  const handleAddFlashcard = async () => {
    const response = await axios.post('/api/flashcards', newCard);
    setFlashcards([...flashcards, response.data]);
    setNewCard({ question: '', answer: '' });
  };

  const handleDeleteFlashcard = async (id) => {
    await axios.delete(`/api/flashcards/${id}`);
    setFlashcards(flashcards.filter(card => card.id !== id));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Question"
        value={newCard.question}
        onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
      />
      <input
        type="text"
        placeholder="Answer"
        value={newCard.answer}
        onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
      />
      <button onClick={handleAddFlashcard}>Add Flashcard</button>
      <ul>
        {flashcards.map(card => (
          <li key={card.id}>
            {card.question} - {card.answer}
            <button onClick={() => handleDeleteFlashcard(card.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
