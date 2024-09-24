import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#222831] to-[#393A45]">
      <div className="max-w-2xl w-1/2 p-8 bg-[#222831] rounded-3xl shadow-2xl h-auto">
        <h2 className="text-3xl font-bold text-[#00ADB5] text-center mb-8">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="block w-full p-4 text-[#F7F7F7] bg-[#393A45] border border-[#393A45] rounded-2xl"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="block w-full p-4 text-[#F7F7F7] bg-[#393A45] border border-[#393A45] rounded-2xl"
          />
          <div className="flex justify-between items-center">
            <button type="submit" className="py-3 px-6 bg-[#00ADB5] hover:bg-[#0097A7] text-[#F7F7F7] font-bold rounded-2xl">
              Login
            </button>
            <p className="text-[#F7F7F7]">
              Don&#39;t have an account? <a href="/register" className="text-[#00ADB5] hover:text-[#0097A7]">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
