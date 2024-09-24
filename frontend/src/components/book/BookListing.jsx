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
    <div className="flex flex-col justify- items-stretch h-screen bg-gradient-to-r from-primary to-secondary">
      <div className="flex flex-col justify-between items-center ">
        <h1 className="text-3xl font-bold text-accent text-center mb-8">Book Listing</h1>
        <div className="flex space-x-4 mb-8">
          <input name="genre" placeholder="Genre" onChange={handleFilterChange} className="p-4 text-neutral bg-secondary border border-secondary rounded-2xl" />
          <input name="author" placeholder="Author" onChange={handleFilterChange} className="p-4 text-neutral bg-secondary border border-secondary rounded-2xl" />
          <input name="date" placeholder="Publication Date" onChange={handleFilterChange} className="p-4 text-neutral bg-secondary border border-secondary rounded-2xl" />
          <button className="py-3 px-6 bg-accent hover:bg-accent hover:bg-opacity-80 text-neutral font-bold rounded-2xl" onClick={() => setFilters({ genre: '', author: '', date: '' })}>Clear Filters</button>
          <button className="py-3 px-6 bg-accent hover:bg-accent hover:bg-opacity-80 text-neutral font-bold rounded-2xl" onClick={() => console.log('Apply Filters')}>Apply Filters</button>
        </div>
        <div className="flex flex-wrap justify-center overflow-y-auto">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <div key={book.id} className="max-w-sm w-1/2 p-8 bg-primary rounded-3xl shadow-2xl m-4">
                <h2 className="text-2xl font-bold text-accent text-center mb-4">{book.title}</h2>
                <p className="text-neutral text-center mb-4">by {book.author}</p>
                <p className="text-neutral text-center mb-4">Genre: {book.genre}</p>
                <p className="text-neutral text-center mb-4">Publication Date: {book.publicationDate}</p>
                <div className="flex items-center space-x-2">
                  <div className={`rounded-full w-5 h-5 flex items-center justify-center ${book.available ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {book.available ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <p className="text-neutral text-sm">{book.available ? 'Available' : 'Not Available'}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral text-center">No books found.</p>
          )}
        </div>
        <div className="flex justify-between items-center mt-8">
          <button className="py-3 px-6 bg-neutral hover:bg-neutral hover:bg-opacity-80 text-accent font-bold rounded-2xl" onClick={() => console.log('Previous')}>Previous</button>
          <button className="py-3 px-6 bg-neutral hover:bg-neutral hover:bg-opacity-80 text-accent font-bold rounded-2xl" onClick={() => console.log('Next')}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default BookListing;
