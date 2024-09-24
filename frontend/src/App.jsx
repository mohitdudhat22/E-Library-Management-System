import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useAuth } from './contexts/AuthContext';
import Register from './components/Register';
import BookForm from './components/book/BookForm';
import BookListing from './components/book/BookListing';
import Loading from './components/common/Loading';
import BookDetailView from './components/book/BookDetailView';
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/bookform' element={<BookForm />} />
        <Route path='/books/edit/:id' element={<BookForm />} />
        <Route path='/booklist' element={<BookListing />} />
        <Route path='/bookdetailview' element={<BookDetailView />} />
        <Route path='/bookdetailview/:id' element={<BookDetailView />} />
        <Route path='/load' element={<Loading />} / >
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
