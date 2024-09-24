import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import BookDetailCard from './BookDetailCard';
import axios from 'axios';

const BookDetailView = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Simulate fetching book details from the backend.
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleBorrow = () => {
    console.log('Borrowing book:', id);
  };

  const handleReturn = () => {
    console.log('Returning book:', id);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      console.log('Book deleted successfully');
      // Navigate to a different route (like book list) after deletion
      navigate('/books');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = () => {
    // Redirect to EditBook form
    navigate(`/books/edit/${id}`);
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
        onEdit={handleEdit} // Pass edit handler
        onDelete={() => handleDelete(id)}  // Pass delete handler
      />
    </div>
  );
};

export default BookDetailView;
