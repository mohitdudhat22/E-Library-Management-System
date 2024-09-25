import React from 'react';
import Navbar from './common/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
