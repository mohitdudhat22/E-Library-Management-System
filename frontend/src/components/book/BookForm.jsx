import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BookForm = ({ book, onSave }) => {
  const [formData, setFormData] = useState(book || { title: '', author: '', genre: '', publicationDate: '', borrowedBy: '', available: true });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-2xl w-1/2 p-8 bg-primary rounded-3xl shadow-2xl h-auto">
        <h2 className="text-3xl font-bold text-accent text-center mb-8">Book Form</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          />
          <input
            type="text"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          />
          <input
            type="text"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Genre"
            required
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          />
          <input
            type="text"
            value={formData.publicationDate}
            onChange={handleChange}
            placeholder="Publication Date"
            required
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          />
          <input
            type="text"
            value={formData.borrowedBy}
            onChange={handleChange}
            placeholder="Borrowed By"
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          />
          <div className="flex items-center space-x-2">
            <div className={`rounded-full w-5 h-5 flex items-center justify-center ${formData.available ? 'bg-green-500' : 'bg-red-500'} text-white`}>
              {formData.available ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <p className="text-neutral text-sm">{formData.available ? 'Available' : 'Not Available'}</p>
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" className="py-3 px-6 bg-accent hover:bg-accent hover:bg-opacity-80 text-neutral font-bold rounded-2xl">
              Save
            </button>
            <button type="reset" className="py-3 px-6 bg-neutral hover:bg-neutral hover:bg-opacity-80 text-accent font-bold rounded-2xl">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BookForm.propTypes = {
  book: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default BookForm;
