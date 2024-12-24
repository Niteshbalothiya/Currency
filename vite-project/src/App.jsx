import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header'; // Import Header component
import HomePage from './pages/HomePage'; // Import HomePage if it exists
import CoinsPages from './pages/CoinsPages';
 // Import CoinsPage if it exists

const App = () => {
  return (
<div className='bg-gray-900 min-h-screen'>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins" element={<CoinsPages />} />
        </Routes>
      </Router>
      </div>
    
  );
};

export default App;




