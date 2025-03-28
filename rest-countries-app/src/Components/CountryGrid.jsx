// src/components/CountryGrid.jsx
import React, { useState } from 'react';

function CountryGrid({ countries, onCountryClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    const searchMatch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const regionMatch = selectedRegion ? country.region === selectedRegion : true;
    return searchMatch && regionMatch;
  });

  return (
    <div className="country-grid-container">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="country-grid">
        {filteredCountries.map((country) => (
          <div
            className="country"
            key={country.cca3}
            onClick={() => onCountryClick(country)} // Pass the country to the onCountryClick function
          >
            <img src={country.flags.png} alt={country.name.common} />
            <h2>{country.name.common}</h2>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryGrid;