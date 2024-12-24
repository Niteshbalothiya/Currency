import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoCon from './CryptoCon'; // Import your CryptoCon provider
import Header from './components/header'; // Import Header component
import HomePage from './pages/HomePage'; // Import HomePage if it exists
import CoinsPages from './pages/CoinsPages';
 // Import CoinsPage if it exists

const App = () => {
  return (
    <CryptoCon> {/* Ensure the provider wraps the whole app */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins" element={<CoinsPages />} />
        </Routes>
      </Router>
    </CryptoCon>
  );
};

export default App;




