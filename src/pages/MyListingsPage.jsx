import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyListingsPage = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get('/api/my-listings')
            .then(response => setListings(response.data))
            .catch(error => console.error(error));
    }, []);

    const deleteListing = (id) => {
        axios.delete(`/api/listings/${id}`)
            .then(response => {
                setListings(listings.filter(listing => listing.id !== id));
                alert('Listing deleted');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>My Listings</h1>
            <div>
                {listings.map(listing => (
                    <div key={listing.id}>
                        <Link to={`/update-listing/${listing.id}`}>
                            <h2>{listing.title}</h2>
                            <p>{listing.description}</p>
                        </Link>
                        <button onClick={() => deleteListing(listing.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyListingsPage;
