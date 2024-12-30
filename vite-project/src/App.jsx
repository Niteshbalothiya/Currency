import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Assuming header is in components folder
import HomePage from './pages/HomePage'; // Assuming homepage is defined
import CoinsPages from './pages/CoinsPages'; // Assuming CoinsPages is in the pages folder

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinsPages />} /> {/* Updated route */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
