// src/components/CountryDetails.jsx
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';

function CountryDetails({ country, onBackClick }) {
  return (
    <div className="country-details-preview">
      <button onClick={onBackClick} className="back-button">
        <IoIosArrowBack /> Back
      </button>
      <div className="country-details">
        <img src={country.flags.png} alt={country.name.common} />
        <div className="details">
          <h2>{country.name.common}</h2>
          <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A'}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Sub Region:</strong> {country.subregion}</p>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Top Level Domain:</strong> {country.tld}</p>
          <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map((currency) => currency.name).join(', ') : 'N/A'}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
          <div className="border-countries">
            <strong>Border Countries:</strong>
            {country.borders ? country.borders.map((border) => <span key={border}>{border}</span>) : <span>None</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;