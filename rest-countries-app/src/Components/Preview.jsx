// src/components/Preview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryGrid from './CountryGrid'; // Import the CountryGrid component

function Preview({ onPreviewEnd }) { // Add onPreviewEnd as a prop
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
        setRandomCountry(response.data[Math.floor(Math.random() * response.data.length)]); // Select a random country
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

    const timer = setTimeout(() => {
      onPreviewEnd(); // Call the onPreviewEnd function after 15 seconds
    }, 15000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [onPreviewEnd]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="preview-container">
      {randomCountry && (
        <div className="preview-flag">
          <img src={randomCountry.flags.png} alt={randomCountry.name.common} />
        </div>
      )}
      <div className="preview-grid">
        <CountryGrid countries={countries} />
      </div>
    </div>
  );
}

export default Preview;