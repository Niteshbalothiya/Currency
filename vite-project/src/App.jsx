import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinsPages from './pages/CoinsPages';

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Router>
        <Header />
        {/* Define Routes */}
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* CoinsPages Route with Dynamic ID */}
          <Route path="/coins/:id" element={<CoinsPages />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
