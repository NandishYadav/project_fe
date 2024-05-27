import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setToken } from '../features/auth/authSlice';
import { saveTokenToLocalStorage } from '../utils/authUtils';
import { toast } from 'react-toastify'; // Import toast

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook to dispatch actions

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    };
    const url="http://3.110.147.185:8109/api/v1/auth/login"
    axios.post(url, userData)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
            console.log(response.data.data.token);
          alert('Sign in successful');
          // Set the token in the Redux store
          saveTokenToLocalStorage(response.data.data.token);
          dispatch(setToken(response.data.token));
          navigate('/'); // Redirect to home page
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          // Display toast notification for wrong credentials
        //   toast.error('Wrong credentials');
          alert('Wrong crenditials');

        } else {
          console.error(error);
        }
      });
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange} // Use handleEmailChange function
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange} // Use handlePasswordChange function
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
