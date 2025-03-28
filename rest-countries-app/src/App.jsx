// src/App.jsx
// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import MoonIcon from './Components/MoonIcon';
import Preview from './Components/Preview';
import CountryGrid from './Components/CountryGrid';
import CountryDetails from './Components/CountryDetails';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleBackClick = () => {
    setSelectedCountry(null);
  };

  const handlePreviewEnd = () => {
    setShowPreview(false);
  };

  if (loading) {
    return (
      <div className={`container ${darkMode ? 'dark-mode' : ''}`}>Loading...</div>
    );
  }

  if (error) {
    return (
      <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>Where in the world?</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : <>Dark Mode <MoonIcon /></>}
        </button>
      </header>
      <div className="main-content">
        {showPreview ? (
          <Preview onPreviewEnd={handlePreviewEnd} />
        ) : selectedCountry ? (
          <CountryDetails country={selectedCountry} onBackClick={handleBackClick} />
        ) : (
          <CountryGrid countries={countries} onCountryClick={handleCountryClick} />
        )}
      </div>
    </div>
  );
}

export default App;