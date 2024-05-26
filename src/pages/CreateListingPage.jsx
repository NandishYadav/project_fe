import React, { useState } from 'react';
import axios from 'axios';

const CreateListingPage = () => {
    const [place, setPlace] = useState('');
    const [area, setArea] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [hospitalNearby, setHospitalNearby] = useState(false);
    const [collegeNearby, setCollegeNearby] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const listingData = {
            place,
            area,
            bedrooms,
            bathrooms,
            hospitalNearby,
            collegeNearby
        };
        axios.post('/api/listings', listingData)
            .then(response => {
                alert('Listing created successfully');
                // Redirect or update state as needed
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container">
            <h1>Create Listing</h1>
            <form onSubmit={handleSubmit} className="listing-form">
                <div className="form-group">
                    <label>Place</label>
                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Area (in sq ft)</label>
                    <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Number of Bedrooms</label>
                    <input
                        type="number"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Number of Bathrooms</label>
                    <input
                        type="number"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={hospitalNearby}
                            onChange={(e) => setHospitalNearby(e.target.checked)}
                        />
                        Hospital Nearby
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={collegeNearby}
                            onChange={(e) => setCollegeNearby(e.target.checked)}
                        />
                        College Nearby
                    </label>
                </div>
                <button type="submit">Create Listing</button>
            </form>
        </div>
    );
};

export default CreateListingPage;
