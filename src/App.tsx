import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <nav className="bg-orange-500 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white text-orange-500 hover:bg-orange-100"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </nav>
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;