import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import CreateListingPage from './pages/CreateListingPage';
import UpdateListingPage from './pages/UpdateListingPage';
import MyListingsPage from './pages/MyListingsPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/listing/:id" component={ListingPage} />
            <Route path="/create-listing" component={CreateListingPage} />
            <Route path="/update-listing/:id" component={UpdateListingPage} />
            <Route path="/my-listings" component={MyListingsPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
        </Switch>
    </Router>
);

export default Routes;
