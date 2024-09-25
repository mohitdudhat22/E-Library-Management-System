import React, { useState, useEffect } from 'react';
import Card from './../common/Card';
import axios from 'axios';
const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ genre: '', author: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        // Using Vite environment variable for API base URL
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books`,
          {
           headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`
           } 
          });
        setBooks(response.data);
      } catch (error) {
        setError('Failed to fetch books.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredBooks = books.filter(book => {
    return (
      (filters.genre ? book.genre === filters.genre : true) &&
      (filters.author ? book.author === filters.author : true) &&
      (filters.date ? new Date(book.publicationDate).toISOString().split('T')[0] === filters.date : true)
    );
  });

  return (
    <div className="flex flex-col justify-items-stretch bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-accent text-center mb-8">Book Listing</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8 justify-center">
          <input name="genre" placeholder="Genre" onChange={handleFilterChange} className="p-4 text-neutral bg-secondary border border-secondary rounded-2xl" />
          <input name="author" placeholder="Author" onChange={handleFilterChange} className="p-4 text-neutral bg-secondary border border-secondary rounded-2xl" />
          <input name="date" placeholder="Publication Date" onChange={handleFilterChange} className="p-4 text-neutral bg-secondary border border-secondary rounded-2xl" />
          <button className="py-3 px-6 bg-accent hover:bg-accent hover:bg-opacity-80 text-neutral font-bold rounded-2xl" onClick={() => setFilters({ genre: '', author: '', date: '' })}>Clear Filters</button>
          <button className="py-3 px-6 bg-accent hover:bg-accent hover:bg-opacity-80 text-neutral font-bold rounded-2xl" onClick={() => console.log('Apply Filters')}>Apply Filters</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-y-scroll scrollbar-hidden" style={{ maxHeight: 'calc(100vh - 300px)', minHeight: 'calc(100vh - 300px)' }}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <Card key={book.id} title={book.title} author={book.author} genre={book.genre} publicationDate={book.publicationDate} available={book.available} />
            ))
          ) : (
            <p className="text-neutral text-center">No books found.</p>
          )}
        </div>
        <div className="flex flex-row justify-between items-center mt-8">
          <button className="py-3 px-6 bg-neutral hover:bg-neutral hover:bg-opacity-80 text-accent font-bold rounded-2xl" onClick={() => console.log('Previous')}>Previous</button>
          <button className="py-3 px-6 bg-neutral hover:bg-neutral hover:bg-opacity-80 text-accent font-bold rounded-2xl" onClick={() => console.log('Next')}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default BookListing;