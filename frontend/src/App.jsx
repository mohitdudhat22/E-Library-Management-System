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
import Layout from './components/Layout';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BookListing />} />
          <Route path="/books/add" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
          <Route path="/bookdetailview" element={<BookDetailView />} />
          <Route path="/bookdetailview/:id" element={<BookDetailView />} />
          <Route path="/load" element={<Loading />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
