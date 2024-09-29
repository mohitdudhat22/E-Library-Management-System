import React, { useEffect, useState } from 'react';
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
    borrowedBy: '',
    available: true,
    image: null,
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
    fetchAllUsers();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/${id}`);
      setFormData({ ...response.data, image: null });
      setImagePreview(response.data.image);
    } catch (error) {
      console.error('Error fetching book details:', error);
      setError('Failed to fetch book details');
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({ ...prevData, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key !== 'image') {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const url = id
        ? `${import.meta.env.VITE_API_BASE_URL}/api/books/${id}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/books`;
      
      const method = id ? 'put' : 'post';
      
      const response = await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Book saved successfully:', response.data);
      navigate('/books');
    } catch (error) {
      console.error('Error saving book:', error);
      setError(error.response?.data?.error || 'Failed to save book');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-primary to-secondary py-8">
      <div className="max-w-2xl w-full p-8 bg-primary rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-accent text-center mb-8">{id ? 'Edit Book' : 'Add New Book'}</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="block w-full p-3 text-neutral bg-secondary border border-secondary rounded-xl"
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
            className="block w-full p-3 text-neutral bg-secondary border border-secondary rounded-xl"
          />
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Genre"
            required
            className="block w-full p-3 text-neutral bg-secondary border border-secondary rounded-xl"
          />
          <input
            type="date"
            name="publicationDate"
            value={formData.publicationDate ? new Date(formData.publicationDate).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            required
            className="block w-full p-3 text-neutral bg-secondary border border-secondary rounded-xl"
          />
          <select
            name="borrowedBy"
            value={formData.borrowedBy}
            onChange={handleChange}
            className="block w-full p-3 text-neutral bg-secondary border border-secondary rounded-xl"
          >
            <option value="">Select User (Borrowed By)</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-accent"
            />
            <label className="text-neutral">Available</label>
          </div>
          <div>
            <label className="block text-neutral mb-2">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="block w-full p-3 text-neutral bg-secondary border border-secondary rounded-xl"
              accept="image/*"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Book Preview" className="mt-4 w-32 h-32 object-cover rounded" />
            )}
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" className="py-2 px-4 bg-accent hover:bg-opacity-80 text-neutral font-bold rounded-xl transition duration-300">
              {id ? 'Update Book' : 'Add Book'}
            </button>
            <button type="button" onClick={() => navigate('/books')} className="py-2 px-4 bg-neutral hover:bg-opacity-80 text-accent font-bold rounded-xl transition duration-300">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;