import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is logged in
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-primary p-4 shadow-lg sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Library App</Link> 
        </div>

        <div className="flex space-x-4">
          <Link to="/books" className="text-white hover:text-accent">Books</Link>
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white hover:text-accent">Login</Link>
              <Link to="/register" className="text-white hover:text-accent">Register</Link>
            </>
          )}
          {isAuthenticated && (
            <>
              {/* Authenticated Links */}
              <Link to="/books/add" className="text-white hover:text-accent">Add Book</Link> {/* Add new book */}
              <Link to="/dashboard" className="text-white hover:text-accent">Dashboard</Link> {/* User dashboard */}

              <button
                onClick={handleLogout}
                className="text-white hover:text-accent focus:outline-none"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
