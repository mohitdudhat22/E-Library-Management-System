import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    borrowedBy: '', // This will hold the selected user
    available: true,
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching book details for editing:', error);
        }
      };

      const fetchAllUsers = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/users`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log(response.data);
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchAllUsers();
      fetchBookDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id);
    try {
      if (id) {
        formData.borrowedBy = users.find(user => user.username === formData.borrowedBy ? user._id : null)?._id || null;
        console.log(formData, "<<<<<<<this is form data");
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/books/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Book updated successfully:', response.data);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/books`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Book created successfully:', response.data);
      }
      navigate('/books');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save book');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-2xl w-1/2 p-8 bg-primary rounded-3xl shadow-2xl h-auto">
        <h2 className="text-3xl font-bold text-accent text-center mb-8">Book Form</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          />
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Genre"
            required
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          />
          <input
            type="date" // Change to date input for better UX
            name="publicationDate"
            // Convert ISO to normal input date
            value={formData.publicationDate ? new Date(formData.publicationDate).toISOString().slice(0, 10) : ''}
            onChange={handleChange}
            placeholder="Publication Date"
            required
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          />
          
          {/* Dropdown for Borrowed By */}
          <select
            name="borrowedBy"
            value={formData.borrowedBy}
            onChange={handleChange}
            className="block w-full p-4 text-neutral bg-secondary border border-secondary rounded-2xl"
          >
            <option value="" disabled>Select User (Borrowed By)</option>
            {users.map((user) => (
              <option key={user.id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>

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

export default BookForm;
