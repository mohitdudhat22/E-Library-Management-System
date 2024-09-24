import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ genre: '', author: '', date: '' });

  useEffect(() => {
    axios.get('/api/books')
      .then(response => setBooks(response.data));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredBooks = books.filter(book => {
    return (
      (filters.genre ? book.genre === filters.genre : true) &&
      (filters.author ? book.author === filters.author : true) &&
      (filters.date ? book.publicationDate === filters.date : true)
    );
  });

  return (
    <div>
      <h1>Book Listing</h1>
      <div>
        <input name="genre" placeholder="Genre" onChange={handleFilterChange} />
        <input name="author" placeholder="Author" onChange={handleFilterChange} />
        <input name="date" placeholder="Publication Date" onChange={handleFilterChange} />
      </div>
      <ul>
        {filteredBooks.map(book => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookListing;
