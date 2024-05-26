import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import CreateListingPage from "./pages/CreateListingPage";
import UpdateListingPage from "./pages/UpdateListingPage";
import MyListingsPage from "./pages/MyListingsPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Navbar from "./components/NavBar"; // Optional: If you have a Navbar component

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Optional: Include Navbar if you have one */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing/:id" element={<ListingPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/update-listing/:id" element={<UpdateListingPage />} />
          <Route path="/my-listings" element={<MyListingsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
