import React, { useState } from 'react';
import axios from 'axios';
import './AddHouseForm.css';


const AddHouseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    area: '',
    image: null,
    number_of_rooms: '',
    number_of_bathrooms: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };

    // const formDataWithImage = new FormData();
    // formDataWithImage.append('name', formData.name);
    // formDataWithImage.append('description', formData.description);
    // formDataWithImage.append('price', formData.price);
    // formDataWithImage.append('location', formData.location);
    // formDataWithImage.append('area', formData.area);
    // formDataWithImage.append('image', formData.image);
    // formDataWithImage.append('number_of_rooms', formData.number_of_rooms);
    // formDataWithImage.append('number_of_bathrooms', formData.number_of_bathrooms);

    try {
        const data = {
            ...formData,
            image: formData.image.toString()
,            owner: "66535bb5aa88cb285104b73c"
        }
        console.log(formData)
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/api/v1/properties/add',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjUzNTBjMWJmYTdiMmE3ZjgzODVkNDMiLCJsYXN0X25hbWUiOiJ5YWRhdiIsImVtYWlsIjoibmFuZHVAZ21haWwuY29tIiwiX192IjowLCJpYXQiOjE3MTY3NDIxMzAsImV4cCI6MTcxNjgyODUzMH0.8OLtsnG2mfe1pOvZPy3adJfi9iE5T3sSKp_lfsu0fJU'
            },
            data : data
          };
        
        // const url = "http://localhost:4000/api/v1/properties/add";
      const response = await axios.request(config);
      console.log(response.data); // Handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </label>
      <label>
        Area:
        <input type="number" name="area" value={formData.area} onChange={handleChange} required />
      </label>
      <label>
        Image:
        <input type="file" accept="image/*" name="image" onChange={handleFileChange} required />
      </label>
      <label>
        Number of Rooms:
        <input type="number" name="number_of_rooms" value={formData.number_of_rooms} onChange={handleChange} required />
      </label>
      <label>
        Number of Bathrooms:
        <input type="number" name="number_of_bathrooms" value={formData.number_of_bathrooms} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddHouseForm;
