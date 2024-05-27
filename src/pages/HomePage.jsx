import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/authUtils';
// import './H';

const HomePage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    hospital: false,
    college: false
  });
  const [houseListings, setHouseListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchHouseListings();
  }, [selectedFilters, currentPage]); // Refetch house listings when filters or pagination change

  const fetchHouseListings = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const peyload = {
        // ...selectedFilters,
        // page: currentPage,
        // owner: "66535bb5aa88cb285104b73c"

      }
      console.log(peyload);
      const url = "http://3.110.147.185:8109/api/v1/properties/all";
      const response = await axios.post(url, {
        // params: { ...selectedFilters, page: currentPage },
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: peyload
      });
      console.log(response);
      setHouseListings(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      handleUnauthorizedResponse(error);
    }
  };

  const handleUnauthorizedResponse = (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      window.location.href = '/signin';
    } else {
      console.error(error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>Home Page</h1>
      <div className="filters">
        {/* Dropdown filters */}
        <select value={selectedFilters.place} onChange={(e) => handleFilterChange('place', e.target.value)}>
          <option value="">Select Place</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Banglore">Banglore</option>
          <option value="Chennai">Chennai</option>
          <option value="Combaitore">Combaitore</option>

          {/* Add more options as needed */}
        </select>
        <select value={selectedFilters.area} onChange={(e) => handleFilterChange('area', e.target.value)}>
          <option value="">Select Area</option>
          <option value="100">100 sqft</option>
          <option value="200">200 sqft</option>
          <option value="300">300 sqft</option>
          <option value="400">400 sqft</option>
          <option value="500">500 sqft</option>
          <option value="600">600 sqft</option>
          {/* Add more options as needed */}
        </select>
        <select value={selectedFilters.bedrooms} onChange={(e) => handleFilterChange('bedrooms', e.target.value)}>
          <option value="">Select Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4 Bedrooms</option>
          {/* Add more options as needed */}
        </select>
        <select value={selectedFilters.bathrooms} onChange={(e) => handleFilterChange('bathrooms', e.target.value)}>
          <option value="">Select Bathrooms</option>
          <option value="1">1 Bathroom</option>
          <option value="2">2 Bathrooms</option>
          <option value="3">3 Bathrooms</option>
          <option value="4">4 Bedrooms</option>
          {/* Add more options as needed */}
        </select>
        <label>
          <input
            type="checkbox"
            checked={selectedFilters.hospital}
            onChange={(e) => handleFilterChange('hospital', e.target.checked)}
          /> Hospital
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedFilters.college}
            onChange={(e) => handleFilterChange('college', e.target.checked)}
          /> College
        </label>
        <button onClick={() => fetchHouseListings()}>Apply Filters</button>
      </div>
      <div className="house-listing">
        {/* Display house listings */}
        {houseListings && houseListings.map(house => (
          <div key={house.id} className="house-card">
            <img src={house.image} alt={house.name} className="house-image"/>
            <div className="house-info">
              <h2>{house.name}</h2>
              <p>{house.description}</p>
              <p>Price: ${house.price}</p>
              <p>Location: {house.location}</p>
              <p>Area: {house.area} sqft</p>
              <p>Rooms: {house.number_of_rooms}</p>
              <p>Bathrooms: {house.number_of_bathrooms}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button key={pageNumber} onClick={() => handlePaginationChange(pageNumber)}>{pageNumber}</button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
