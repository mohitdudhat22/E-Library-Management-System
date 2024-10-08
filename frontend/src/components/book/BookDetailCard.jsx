import React from 'react';

const BookDetailCard = ({ title, author, genre, publicationDate, available, onBorrow, onReturn, onDelete, onEdit, isBorrowed }) => {
  return (
    <div className="flex flex-col justify-between p-8 w-full max-w-lg h-auto bg-gradient-to-r from-primary to-secondary rounded-3xl shadow-2xl text-neutral transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col space-y-6">
        <h2 className="text-4xl font-bold text-accent text-center uppercase tracking-wide">{title}</h2>
        <p className="text-xl text-center">
          Author: <span className="font-semibold text-neutral">{author}</span>
        </p>
        <p className="text-xl text-center">
          Genre: <span className="font-semibold text-neutral">{genre}</span>
        </p>
        <p className="text-xl text-center">
          Published On: <span className="font-semibold text-neutral">{new Date(publicationDate).toLocaleDateString()}</span>
        </p>
        <p className="text-xl text-center">
          Availability:{' '}
          <span className={`font-semibold ${available ? 'text-green-500' : 'text-red-500'}`}>
            {available ? 'Available' : 'Not Available'}
          </span>
        </p>
      </div>

      <div className="flex justify-between mt-10 space-x-6">
        {available && !isBorrowed && ( // Show Borrow button only if available and not borrowed
          <button
            className="w-full py-4 px-8 bg-accent text-neutral font-bold rounded-2xl shadow-md transition-all duration-200 hover:bg-accent-hover"
            onClick={onBorrow}
          >
            Borrow
          </button>
        )}
        {!available && isBorrowed && ( // Show Return button only if not available and borrowed
          <button
            className="w-full py-4 px-8 bg-neutral text-accent font-bold rounded-2xl shadow-md hover:bg-opacity-80 transition-all duration-200"
            onClick={onReturn}
          >
            Return
          </button>
        )}
      </div>

      <div className="flex justify-between mt-10 space-x-6">
        <button
          className="w-full py-4 px-8 bg-blue-600 text-neutral font-bold rounded-2xl shadow-md hover:bg-blue-700 transition-all duration-200"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="w-full py-4 px-8 bg-red-600 text-neutral font-bold rounded-2xl shadow-md hover:bg-red-700 transition-all duration-200"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookDetailCard;
