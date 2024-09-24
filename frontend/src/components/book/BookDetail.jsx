import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetailView = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details from the backend
    fetch(`/api/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data));
  }, [id]);

  const handleBorrow = () => {
    // Implement borrow functionality
    console.log('Borrowing book:', id);
  };

  const handleReturn = () => {
    // Implement return functionality
    console.log('Returning book:', id);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Publication Date: {book.publicationDate}</p>
      <button onClick={handleBorrow}>Borrow</button>
      <button onClick={handleReturn}>Return</button>
    </div>
  );
};

export default BookDetailView;
