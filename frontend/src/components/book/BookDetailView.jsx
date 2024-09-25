import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetailCard from './BookDetailCard';
import axios from 'axios';

const BookDetailView = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleBorrow = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/books/${id}/borrow`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Book borrowed successfully');
      navigate('/books');
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const handleReturn = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/books/${id}/return`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Book returned successfully');
      navigate('/books');
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Book deleted successfully');
      navigate('/books');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = () => {
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
        onEdit={handleEdit}
        onDelete={() => handleDelete(id)}
        isBorrowed={book.isBorrowed}
      />
    </div>
  );
};

export default BookDetailView;
