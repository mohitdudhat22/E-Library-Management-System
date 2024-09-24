import React, { useState } from 'react';

const BookForm = ({ book, onSave }) => {
  const [formData, setFormData] = useState(book || { title: '', author: '', genre: '', publicationDate: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" />
      <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
      <input name="publicationDate" value={formData.publicationDate} onChange={handleChange} placeholder="Publication Date" />
      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;
