import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateListingPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get(`/api/listings/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
            })
            .catch(error => console.error(error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/listings/${id}`, { title, description })
            .then(response => {
                alert('Listing updated');
                // Redirect or update state as needed
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Update Listing</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateListingPage;
