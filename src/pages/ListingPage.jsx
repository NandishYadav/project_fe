import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ListingPage = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);


    useEffect(() => {
        axios.get(`/api/listings/${id}`)
            .then(response => setListing(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const markInterested = () => {
        axios.post(`/api/listings/${id}/interested`)
            .then(response => alert('Contact info shared'))
            .catch(error => console.error(error));
    };

    return (
        <div>
            {listing ? (
                <div>
                    <h1>{listing.title}</h1>
                    <p>{listing.description}</p>
                    <button onClick={markInterested}>Mark Interested</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ListingPage;
