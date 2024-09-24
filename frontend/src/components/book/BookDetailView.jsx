import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookDetailCard from './BookDetailCard';

const BookDetailView = () => {
  const { id } = useParams(); // You can ignore this for now since we are using dummy data
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Simulating fetching book data with dummy data
    const dummyBook = {
      id: id, // This can come from params or static id for now
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classics',
      publicationDate: '1925-04-10',
      available: true, // Change this to false to test unavailable state
    };

    // Simulate network delay
    setTimeout(() => setBook(dummyBook), 500);
  }, [id]);

  const handleBorrow = () => {
    console.log('Borrowing book:', id);
  };

  const handleReturn = () => {
    console.log('Returning book:', id);
  };

  if (!book) return <div className="text-center text-neutral">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-primary to-secondary">
      <BookDetailCard
        title={book.title}
        author={book.author}
        genre={book.genre}
        publicationDate={book.publicationDate}
        available={book.available}
        onBorrow={handleBorrow}
        onReturn={handleReturn}
      />
    </div>
  );
};

export default BookDetailView;
